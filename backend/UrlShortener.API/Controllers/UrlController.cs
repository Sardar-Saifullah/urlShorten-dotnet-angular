using Microsoft.AspNetCore.Mvc;
using UrlShortener.API.Models;
using UrlShortener.API.Services;

namespace UrlShortener.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlController : ControllerBase
    {
        private readonly IUrlService _urlService;
        private readonly ILogger<UrlController> _logger;

        public UrlController(IUrlService urlService, ILogger<UrlController> logger)
        {
            _urlService = urlService;
            _logger = logger;
        }

        [HttpPost("shorten")]
        public async Task<IActionResult> CreateShortUrl([FromBody] CreateUrlRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Url))
                return BadRequest(new { error = "URL is required" });

            var url = await _urlService.CreateShortUrlAsync(request.Url);
            return Ok(new { message = "Short URL created successfully", data = url });
        }

        [HttpGet("{shortCode}")]
        public async Task<IActionResult> GetUrlByShortCode(string shortCode)
        {
            var url = await _urlService.GetUrlByShortCodeAsync(shortCode);
            if (url == null) return NotFound(new { error = "Short URL not found" });
            return Ok(url);
        }

        [HttpGet("{shortCode}/redirect")]
        public async Task<IActionResult> RedirectToOriginalUrl(string shortCode)
        {
            var url = await _urlService.GetUrlAndIncrementAccessCountFullAsync(shortCode);
            if (url == null) return NotFound(new { error = "Short URL not found" });

            return Ok(new { message = "Access recorded", data = url });
        }

        [HttpPut("update-shortcode/{*originalUrl}")]
        public async Task<IActionResult> UpdateShortCode([FromRoute] string originalUrl)
        {
            originalUrl = Uri.UnescapeDataString(originalUrl);
            if (string.IsNullOrWhiteSpace(originalUrl))
                return BadRequest(new { error = "Original URL is required" });

            var url = await _urlService.UpdateUrlAsync(originalUrl);
            if (url == null) return NotFound(new { error = "URL not found" });

            return Ok(new { message = "Short code updated successfully", data = url });
        }

        [HttpDelete("{shortCode}")]
        public async Task<IActionResult> DeleteUrl(string shortCode)
        {
            var deleted = await _urlService.DeleteUrlAsync(shortCode);
            if (!deleted) return NotFound(new { error = "Short URL not found" });
            return NoContent();
        }

        [HttpGet("getall")]
        public async Task<IActionResult> GetAllUrls()
        {
            var urls = await _urlService.GetAllUrlsAsync();
            return Ok(urls);
        }
    }
}
