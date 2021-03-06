using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
//using AutoMapper;
using DatingApplication.API.Data;
using DatingApplication.API.Dtos;
using DatingApplication.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
//using Microsoft.IdentityModel.Tokens;
using AutoMapper;



namespace DatingApplication.API.Controllers
{
   // [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
     private readonly IConfiguration _config;
     private readonly IMapper _mapper;
    //     private readonly UserManager<User> _userManager;
    //     private readonly SignInManager<User> _signInManager;

       private IAuthRepository _authrepo;

        public AuthController(IAuthRepository authrepo,IConfiguration config, IMapper mapper)
        {
        //     _userManager = userManager;
        //     _signInManager = signInManager;
             _mapper = mapper;
             _config = config;

        _authrepo =authrepo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
             userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

          if(await _authrepo.UserExists(userForRegisterDto.Username))
          return BadRequest("User already exists");

          // var userToCreate = new User
          // {
          //  UserName = userForRegisterDto.Username
           
          // };

          var userToCreate = _mapper.Map<User>(userForRegisterDto);

             var createdUser = await _authrepo.Register(userToCreate,userForRegisterDto.Password);

           var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);

           return CreatedAtRoute("GetUser", new {controller =  "Users", id = createdUser.Id},userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
    

            var userFromRepo = await _authrepo.Login
            (userForLoginDto.Username.ToLower(),userForLoginDto.Password);

           if(userFromRepo ==null)
           return Unauthorized();

         var claims = new[]
        {
          new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()), 
          new Claim(ClaimTypes.Name,userFromRepo.UserName)
        };

          var key = new SymmetricSecurityKey(Encoding.UTF8
          .GetBytes(_config.GetSection("AppSettings:Token").Value));

          var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };            
          

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var user =_mapper.Map<UserForListDto>(userFromRepo);

            return Ok(new {token = tokenHandler.WriteToken(token),
            user
            } );

      

        }

        // private async Task<string> GenerateJwtToken(User user)
        // {
        //     var claims = new List<Claim>
        //     {
        //         new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //         new Claim(ClaimTypes.Name, user.UserName)
        //     };

        //     var roles = await _userManager.GetRolesAsync(user);

        //     foreach (var role in roles)
        //     {
        //         claims.Add(new Claim(ClaimTypes.Role, role));
        //     }

        //     var key = new SymmetricSecurityKey(Encoding.UTF8
        //         .GetBytes(_config.GetSection("AppSettings:Token").Value));

        //     var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        //     var tokenDescriptor = new SecurityTokenDescriptor
        //     {
        //         Subject = new ClaimsIdentity(claims),
        //         Expires = DateTime.Now.AddDays(1),
        //         SigningCredentials = creds
        //     };

        //     var tokenHandler = new JwtSecurityTokenHandler();

        //     var token = tokenHandler.CreateToken(tokenDescriptor);

        //     return tokenHandler.WriteToken(token);
        // }
    } 
    }

