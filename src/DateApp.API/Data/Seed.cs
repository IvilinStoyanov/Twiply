using System.Collections.Generic;
using System.Linq;
using DateApp.API.Models;
using Newtonsoft.Json;

namespace DateApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;

        }

        public void SeedUsers()
        {
            if(!_context.Users.Any()) {
            var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] passwardHash, passwordSalt;
                CreatePasswordHash("password", out passwardHash, out passwordSalt);
                user.PasswordHash = passwardHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();

                _context.Add(user);
            }
            _context.SaveChanges();
            }
        }
         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512()) 
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }      
        }
    }
}