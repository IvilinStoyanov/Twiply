using AutoMapper;
using DateApp.API.Dtos;
using DateApp.API.Models;

namespace DateApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>();
            CreateMap<User, UserForDetailDto>();
        }
    }
}