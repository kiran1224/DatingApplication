using System.Linq;
using AutoMapper;
using DatingApplication.API.Dtos;
using DatingApplication.API.Models;

namespace DatingApplication.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
          CreateMap<User,UserForListDto>()
          .ForMember(dest => dest.PhotoUrl,opt =>opt.MapFrom(src => src.Photos
          .FirstOrDefault(p =>p.IsMain).Url))
           .ForMember(dest => dest.Age,opt =>opt.MapFrom(src => src.DateOfBirth
          .CalculateAge()));

          CreateMap<User,UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl,opt =>opt.MapFrom(src => src.Photos
          .FirstOrDefault(p =>p.IsMain).Url))
           .ForMember(dest => dest.Age,opt =>opt.MapFrom(src => src.DateOfBirth
          .CalculateAge()));;


          CreateMap<Photo,PhotosForDetailDto>();
          CreateMap<UserForUpdateDto,User>();
          CreateMap<Photo,PhotoForReturnDto>();
          CreateMap<PhotoForCreationDto,Photo>();
        }

    }
}