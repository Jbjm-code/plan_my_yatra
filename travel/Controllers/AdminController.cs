using Microsoft.AspNetCore.Mvc;
using travel.Models;
using travel.Data;

namespace travel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var admin = _context.Admins
                .FirstOrDefault(x => x.email == request.Identifier);

            if (admin == null)
            {
                return Unauthorized(new
                {
                    message = "Admin not found"
                });
            }

            bool isMatch = BCrypt.Net.BCrypt.Verify(
                request.Password,
                admin.password
            );

            if (!isMatch)
            {
                return Unauthorized(new
                {
                    message = "Invalid password"
                });
            }

            return Ok(new
            {
                adminId = admin.id,
                token = "demo-token",
                admin
            });
        }

    }
}