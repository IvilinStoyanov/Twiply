using System.Linq;
using AutoMapper;
using DateApp.API.Dtos;
using DateApp.API.Models;

namespace DateApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age,
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<Post, PostForReturnDto>()
            .ForMember(p => p.Author,
             opt => opt.MapFrom(src => src.User.KnownAs))
             .ForMember(p => p.AuthorPhotoUrl, opt => opt.MapFrom(u => u.User.Photos.FirstOrDefault(p => p.IsMain).Url))
             .ForMember(p => p.AuthorId, opt => opt.MapFrom(src => src.User.Id));
            CreateMap<Comment, CommentToReturnDto>();
            CreateMap<User, UserForCommentDto>()
            .ForMember(u => u.PhotoUrl, opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToRuturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt =>
                     opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt =>
                     opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}