using AdSearchAPI.Models;
using AdSearchAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdSearchAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AdService _adService;

        public UsersController(UserService userService, AdService adService)
        {
            _userService = userService;
            _adService = adService;
        }

        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var userAds = _adService.GetAdsByUser(id);
            return Ok(new
            {
                user = user,
                ads = userAds
            });
        }
    }
}
