using AdSearchAPI.Models;

namespace AdSearchAPI.Services
{
    public class AdService
    {
        private readonly List<Ad> _ads = new()
        {
            new Ad { Id = 1, Title = "Used Bicycle", Description = "Mountain bike in excellent condition", Price = 300, Category = "Sports", UserId = 1, CreatedDate = DateTime.Now.AddDays(-10) },
            new Ad { Id = 2, Title = "Vintage Guitar", Description = "Beautiful acoustic guitar with great sound", Price = 450, Category = "Music", UserId = 2, CreatedDate = DateTime.Now.AddDays(-5) },
            new Ad { Id = 3, Title = "Laptop Computer", Description = "Dell XPS 13, Intel i7, 16GB RAM", Price = 800, Category = "Electronics", UserId = 3, CreatedDate = DateTime.Now.AddDays(-2) },
            new Ad { Id = 4, Title = "Leather Sofa", Description = "3-seater brown leather sofa", Price = 600, Category = "Furniture", UserId = 4, CreatedDate = DateTime.Now.AddDays(-7) },
            new Ad { Id = 5, Title = "iPhone 13", Description = "iPhone 13 Pro Max, 256GB, Space Gray", Price = 900, Category = "Electronics", UserId = 5, CreatedDate = DateTime.Now.AddDays(-1) },
            new Ad { Id = 6, Title = "Running Shoes", Description = "Nike Air Max running shoes, size 10", Price = 120, Category = "Sports", UserId = 6, CreatedDate = DateTime.Now.AddDays(-3) }
        };

        public IEnumerable<Ad> GetAllAds()
        {
            return _ads.OrderByDescending(a => a.CreatedDate);
        }

        public IEnumerable<Ad> SearchAds(string? searchTerm = null)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return new List<Ad>();

            searchTerm = searchTerm.ToLowerInvariant();
            return _ads
                .Where(a => a.Title.ToLower().Contains(searchTerm) 
                         || a.Description.ToLower().Contains(searchTerm)
                         || a.Category.ToLower().Contains(searchTerm))
                .OrderByDescending(a => a.CreatedDate)
                .ToList();
        }

        public IEnumerable<Ad> GetAdsByUser(int userId)
        {
            return _ads.Where(a => a.UserId == userId).OrderByDescending(a => a.CreatedDate);
        }
    }
}
