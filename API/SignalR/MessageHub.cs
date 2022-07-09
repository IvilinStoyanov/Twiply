using System;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class MessageHub : Hub
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IHubContext<PresenceHub> _presenceHub;
        private readonly PresenceTracker _presenceTracker;

        public MessageHub(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IHubContext<PresenceHub> presenceHub,
            PresenceTracker presenceTracker
        )
        {
            _unitOfWork = unitOfWork;
            _presenceHub = presenceHub;
            _mapper = mapper;
            _presenceTracker = presenceTracker;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var otherUser = httpContext.Request.Query["user"].ToString();
            var groupName = GetGroupName(Context.User.GetUsername(), otherUser);

            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            var group = await AddToGroup(groupName);

            await Clients.Group(groupName).SendAsync("UpdatedGroup", group);

            var message =
                await _unitOfWork.MessageRepository
                    .GetMessageThread(Context.User.GetUsername(), otherUser);

            if (_unitOfWork.HasChanges()) await _unitOfWork.Complete();

            await Clients.Caller.SendAsync("RecieveMessageThread", message);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var group = await RemoveFromChatGroup();
            
            await Clients.Group(group.Name).SendAsync("UpdatedGroup", group);

            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(CreateMessageDto createMessageDto)
        {
            var username = Context.User.GetUsername();

            if (username == createMessageDto.RecipientUserName.ToLower())
                throw new HubException("Wrong recipient");

            var sender = await _unitOfWork.UserRepository.GetUserByUsernameAsync(username);
            var recipient =
                await _unitOfWork.UserRepository
                    .GetUserByUsernameAsync(createMessageDto.RecipientUserName);

            if (recipient == null) throw new HubException("Not found user");

            var message =
                new Message {
                    Sender = sender,
                    Recipient = recipient,
                    SenderUsername = sender.UserName,
                    RecipientUsername = recipient.UserName,
                    Content = createMessageDto.Content
                };

            var groupName = GetGroupName(sender.UserName, recipient.UserName);

            var group = await _unitOfWork.MessageRepository.GetChatGroup(groupName);

            if (group.Connections.Any(x => x.Username == recipient.UserName))
            {
                message.DateRead = DateTime.UtcNow;
            }
            else
            {
                var connections =
                    await _presenceTracker
                        .GetConnectionsForUser(recipient.UserName);

                if (connections != null)
                {
                    await _presenceHub
                        .Clients
                        .Clients(connections)
                        .SendAsync("NewMessageReceived",
                        new {
                            username = sender.UserName,
                            knownAs = sender.KnownAs
                        });
                }
            }

            _unitOfWork.MessageRepository.AddMessage (message);

            if (await _unitOfWork.Complete())
            {
                await Clients
                    .Group(groupName)
                    .SendAsync("NewMessage", _mapper.Map<MessageDto>(message));
            }
        }

        private async Task<ChatGroup> AddToGroup(string groupName)
        {
            var group = await _unitOfWork.MessageRepository.GetChatGroup(groupName);

            var connection =
                new Connection(Context.ConnectionId,
                    Context.User.GetUsername());

            if (group == null)
            {
                group = new ChatGroup(groupName);
                _unitOfWork.MessageRepository.AddGroup (group);
            }

            group.Connections.Add (connection);

            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to join chat group");
        }

        private async Task<ChatGroup> RemoveFromChatGroup()
        {
            var group =
                await _unitOfWork.MessageRepository
                    .GetGroupForConnection(Context.ConnectionId);

            var connection =
                group
                    .Connections
                    .FirstOrDefault(x =>
                        x.ConnectionId == Context.ConnectionId);

            _unitOfWork.MessageRepository.RemoveConnection(connection);

            if (await _unitOfWork.Complete()) return group;

            throw new HubException("Failed to removed from group");
        }

        private string GetGroupName(string caller, string other)
        {
            var stringCompare = string.CompareOrdinal(caller, other) < 0;

            return stringCompare ? $"{caller}-{other}" : $"{other}-{caller}";
        }
    }
}
