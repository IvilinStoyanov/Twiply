using System.Threading.Tasks;
using DateApp.API.Data.Repository.Contracts;
using DateApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DateApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(string username, string password ) 
        {
            username = username.ToLower();

            if(await _repo.UserExist(username)) {
                return BadRequest("Username already exist"); 
            }   

            var userToCreate = new User 
            {
                Username = username
            };
            var createdUser = await _repo.Register(userToCreate, password);
            // TODO: Fix this
            return StatusCode(201);
        }
    }
}