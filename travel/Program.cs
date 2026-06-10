using Microsoft.EntityFrameworkCore;
using travel.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(
options =>
options.UseMySql(
builder.Configuration.GetConnectionString(
"DefaultConnection"
),
ServerVersion.AutoDetect(
builder.Configuration.GetConnectionString(
"DefaultConnection"
))
));

// CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy(
    "ReactPolicy",
    policy =>
    {
        policy.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable CORS

app.UseCors("ReactPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
