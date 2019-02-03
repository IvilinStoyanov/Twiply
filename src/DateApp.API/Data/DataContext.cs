using DateApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DateApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Values> Values {get; set;}
        
    }
}