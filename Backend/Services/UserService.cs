using AdSearchAPI.Models;

namespace AdSearchAPI.Services
{
    public class UserService
    {
        private readonly List<User> _users = new()
        {
            new User { Id = 1, Username = "john_doe", Email = "john@example.com", FullName = "John Doe", City = "New York", CreatedDate = DateTime.Now.AddDays(-30), IsActive = true },
            new User { Id = 2, Username = "sarah_smith", Email = "sarah@example.com", FullName = "Sarah Smith", City = "Los Angeles", CreatedDate = DateTime.Now.AddDays(-45), IsActive = true },
            new User { Id = 3, Username = "mike_johnson", Email = "mike@example.com", FullName = "Mike Johnson", City = "Chicago", CreatedDate = DateTime.Now.AddDays(-20), IsActive = true },
            new User { Id = 4, Username = "emily_wilson", Email = "emily@example.com", FullName = "Emily Wilson", City = "Houston", CreatedDate = DateTime.Now.AddDays(-15), IsActive = false },
            new User { Id = 5, Username = "alex_brown", Email = "alex@example.com", FullName = "Alex Brown", City = "Phoenix", CreatedDate = DateTime.Now.AddDays(-60), IsActive = true },
            new User { Id = 6, Username = "jessica_davis", Email = "jessica@example.com", FullName = "Jessica Davis", City = "Philadelphia", CreatedDate = DateTime.Now.AddDays(-25), IsActive = true }
        };

        public IEnumerable<User> GetAllUsers()
        {
            return _users.OrderByDescending(u => u.CreatedDate);
        }

        public User? GetUserById(int id)
        {
            return _users.FirstOrDefault(u => u.Id == id);
        }
    }
}
