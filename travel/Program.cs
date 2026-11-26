using Microsoft.EntityFrameworkCore;
using travel.Services;
using travel.Data;

var builder = WebApplication.CreateBuilder(args);

// =============================
// Controllers
// =============================
builder.Services.AddControllers();

// =============================
// Email Service
// =============================
builder.Services.AddSingleton<EmailService>();

// =============================
// Session
// =============================
builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;

    // IMPORTANT for cross-origin (React + API)
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

// =============================
// Database (MySQL)
// =============================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(
            builder.Configuration.GetConnectionString("DefaultConnection")
        )
    )
);

// =============================
// CORS (FIXED)
// =============================
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://planmyyatra.com",
                "https://www.planmyyatra.com"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // IMPORTANT (because you use Session)
    });
});

// =============================
// Swagger
// =============================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// =============================
// Middleware Pipeline (IMPORTANT ORDER)
// =============================

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Travel API V1");
});

// HTTPS redirect
app.UseHttpsRedirection();

// Routing MUST come before CORS
app.UseRouting();

// CORS MUST be after routing
app.UseCors("ReactPolicy");

// Session (after CORS)
app.UseSession();

// Authorization
app.UseAuthorization();

// Map controllers
app.MapControllers();

app.Run();