using System.Threading.Tasks;
using DateApp.API.Models;
using System.Collections.Generic;

namespace DateApp.API.Data.Repository.Contracts
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser();
    }
}