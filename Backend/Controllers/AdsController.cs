using AdSearchAPI.Models;
using AdSearchAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace AdSearchAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : ControllerBase
    {
        private readonly AdService _adService;

        public AdsController(AdService adService)
        {
            _adService = adService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var ads = _adService.GetAllAds();
            return Ok(ads);
        }

        [HttpGet("search")]
        public IActionResult Search(string? searchTerm)
        {
            var ads = _adService.SearchAds(searchTerm);
            return Ok(new
            {
                count = ads.Count(),
                searchTerm = searchTerm,
                data = ads
            });
        }
    }
}
