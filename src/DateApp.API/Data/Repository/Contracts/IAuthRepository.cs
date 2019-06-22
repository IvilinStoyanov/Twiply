using System.Threading.Tasks;
using DateApp.API.Models;

namespace DateApp.API.Data.Repository.Contracts
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);

         Task<User> Login(string username, string password);

         Task<bool> UserExist(string username);
    }
}