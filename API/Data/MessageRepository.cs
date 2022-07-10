using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;

        public readonly IMapper _mapper;

        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add (message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query =
                _context
                    .Messages
                    .FromSqlRaw(String
                        .Format("select * from Messages m where m.Id in(select max(Id) from Messages m2 where RecipientUsername = '{0}' and m2.SenderId = m.SenderId)",
                        messageParams.Username))
                    .OrderByDescending(x => x.MessageSent);

            // query = messageParams.Container switch
            // {
            //     "Unread" => query.Where(u => u.DateRead == null),
            //     _ => query.Where(u => u.Recipient.UserName == messageParams.Username)
            // };
            var messages =
                query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>
                .CreateAsync(messages,
                messageParams.PageNumber,
                messageParams.PageSize);
        }
     
        public void AddGroup(ChatGroup chatGroup)
        {
            _context.ChatGroups.Add(chatGroup);
        }

        public void RemoveConnection(Connection connection)
        {
            _context.Connections.Remove(connection);
        }

        public async Task<Connection> GetConnection(string connectionId)
        {
            return await _context.Connections.FindAsync(connectionId);
        }

        public async Task<ChatGroup> GetGroupForConnection(string connectionId)
        {
            return await _context
                .ChatGroups
                .Include(c => c.Connections)
                .Where(c =>
                    c.Connections.Any(x => x.ConnectionId == connectionId))
                .FirstOrDefaultAsync();
        }

        public async Task<ChatGroup> GetChatGroup(string groupName)
        {
            return await _context
                .ChatGroups
                .Include(x => x.Connections)
                .FirstOrDefaultAsync(x => x.Name == groupName);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
        {
            var messages =
                await _context
                    .Messages
                    .Where(m =>
                        m.Recipient.UserName == currentUsername &&
                        m.Sender.UserName == recipientUsername ||
                        m.Recipient.UserName == recipientUsername &&
                        m.Sender.UserName == currentUsername)
                    .OrderBy(m => m.MessageSent)
                    .ProjectTo<MessageDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

            var unreadMessages =
                messages
                    .Where(m =>
                        m.DateRead == null &&
                        m.RecipientUsername == currentUsername)
                    .ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
            }

            return messages;
        }
    }
}
