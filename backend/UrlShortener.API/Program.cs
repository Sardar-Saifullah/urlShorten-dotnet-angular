using Dapper;
using UrlShortener.API.Repository;
using UrlShortener.API.Services;

var builder = WebApplication.CreateBuilder(args);
DefaultTypeMap.MatchNamesWithUnderscores = true;

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS for Angular frontend (default Angular port: 4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4200", "https://localhost:7086")  // Angular default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register dependencies
builder.Services.AddScoped<IUrlRepository, UrlRepository>();
builder.Services.AddScoped<IUrlService, UrlService>();
builder.Services.AddLogging();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use Angular CORS policy
app.UseCors("AllowAngularApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
