using Dapper;
using MySql.Data.MySqlClient;
using UrlShortener.API.Models;
using Microsoft.Extensions.Logging;

namespace UrlShortener.API.Repository
{
    public class UrlRepository : IUrlRepository
    {
        private readonly string _connectionString;
        private readonly ILogger<UrlRepository> _logger;

        public UrlRepository(IConfiguration configuration, ILogger<UrlRepository> logger)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")!;
            _logger = logger;
        }

        public async Task<Url> CreateAsync(string originalUrl, string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            var result = await connection.QueryFirstOrDefaultAsync<Url>(
                "CreateShortUrl",
                new { p_original_url = originalUrl, p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );

            if (result == null)
                throw new Exception("Failed to create short URL");

            return result;
        }

        public async Task<Url?> GetByShortCodeAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Url>(
                "GetUrlByShortCode",
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<Url?> GetAndIncrementAccessCountAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Url>(
                "GetUrlAndIncrementCount",
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<Url?> UpdateShortCodeAsync(string originalUrl, string newShortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Url>(
                "UpdateShortCodeByOriginalUrl",
                new
                {
                    p_original_url = originalUrl,
                    p_new_short_code = newShortCode
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<bool> DeleteAsync(string shortCode)
        {
            using var connection = new MySqlConnection(_connectionString);
            var affectedRows = await connection.ExecuteAsync(
                "DeleteUrl",
                new { p_short_code = shortCode },
                commandType: System.Data.CommandType.StoredProcedure
            );
            return affectedRows > 0;
        }

        public async Task<IEnumerable<Url>> GetAllAsync()
        {
            using var connection = new MySqlConnection(_connectionString);
            return await connection.QueryAsync<Url>(
                "GetAllUrls",
                commandType: System.Data.CommandType.StoredProcedure
            );
        }
    }
}
