using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DateApp.API.Data.Repository.Contracts;
using DateApp.API.Dtos;
using DateApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DateApp.API.Controllers
{    
    // [Authorize]
    [Route("api/post")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;

        public PostController(IDatingRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(Post post)
        {
            var author = await _repo.GetUser(post.UserId);

            if (author.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            _repo.Add(post);
            if (await _repo.SaveAll())
            {
                return Ok();
            }

            throw new Exception("Creation the post failed on save");
        }
    }
}