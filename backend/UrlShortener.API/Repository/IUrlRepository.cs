using UrlShortener.API.Models;

namespace UrlShortener.API.Repository
{
    public interface IUrlRepository
    {
        Task<Url> CreateAsync(string originalUrl, string shortCode);
        Task<Url?> GetByShortCodeAsync(string shortCode);
        Task<Url?> GetAndIncrementAccessCountAsync(string shortCode);
        Task<Url?> UpdateShortCodeAsync(string originalUrl, string newShortCode);
        Task<bool> DeleteAsync(string shortCode);
        Task<IEnumerable<Url>> GetAllAsync();
    }
}
