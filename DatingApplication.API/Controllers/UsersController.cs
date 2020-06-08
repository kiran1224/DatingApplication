using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApplication.API.Data;
using DatingApplication.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApplication.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {

         private readonly IDatingRepository _repo;
         private readonly IMapper _mapper;
        public UsersController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        
        }
        
         [HttpGet]
         public async Task<IActionResult> GetUsers()
         {
           var users = await  _repo.GetUsers();
           var usersToList = _mapper.Map<IEnumerable<UserForListDto>>(users);
           return Ok(usersToList);
         }


          [HttpGet("{id}")]
         public async Task<IActionResult> GetUser(int id)
         {
           var user = await  _repo.GetUser(id);
           var userToReturn = _mapper.Map<UserForDetailedDto>(user);

           return Ok(userToReturn);
         }



      [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.Savell())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }



    }
}