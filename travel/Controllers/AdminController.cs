using Microsoft.AspNetCore.Mvc;
using travel.Services;
using travel.Data;
using travel.Models;

namespace travel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly EmailService _emailService;

        public AdminController(
     AppDbContext context,
     EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
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

                admin = new
                {
                    admin.id,
                    admin.name,
                    admin.email,
                    admin.mobile
                }
            });
        }


        [HttpGet("{id}")]
        public IActionResult GetAdmin(int id)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.id == id);

            if (admin == null)
            {
                return NotFound(new
                {
                    message = "Admin not found"
                });
            }

            return Ok(new
            {
                admin.id,
                admin.name,
                admin.email,
                admin.mobile
            });
        }

        [HttpPut("update-admin/{id}")]
        public IActionResult UpdateAdmin(
    int id,
    AdminUpdateRequest request)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.id == id);

            if (admin == null)
            {
                return NotFound(new
                {
                    message = "Admin not found"
                });
            }

            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(new
                {
                    message = "Name is required"
                });
            }

            if (string.IsNullOrWhiteSpace(request.Email))
            {
                return BadRequest(new
                {
                    message = "Email is required"
                });
            }

            if (string.IsNullOrWhiteSpace(request.Mobile))
            {
                return BadRequest(new
                {
                    message = "Mobile number is required"
                });
            }

            admin.name = request.Name.Trim();
            admin.email = request.Email.Trim();
            admin.mobile = request.Mobile.Trim();

            _context.SaveChanges();

            return Ok(new
            {
                message = "Profile updated successfully"
            });
        }

        [HttpPut("reset-password/{id}")]
        public IActionResult ResetPassword(
    int id,
    ResetPasswordRequest request)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.id == id);

            if (admin == null)
            {
                return NotFound();
            }

            bool isValid =
                BCrypt.Net.BCrypt.Verify(
                    request.CurrentPassword,
                    admin.password
                );

            if (!isValid)
            {
                return BadRequest(new
                {
                    message = "Current password incorrect"
                });
            }

            if (request.NewPassword != request.ConfirmPassword)
            {
                return BadRequest(new
                {
                    message = "Passwords do not match"
                });
            }

            admin.password =
                BCrypt.Net.BCrypt.HashPassword(
                    request.NewPassword
                );

            _context.SaveChanges();

            return Ok(new
            {
                message = "Password updated successfully"
            });
        }

        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromBody] ForgotPasswordRequest request)
        {
            var admin = _context.Admins
                .FirstOrDefault(a => a.email == request.Email);

            if (admin == null)
            {
                return NotFound(new
                {
                    message = "Admin not found"
                });
            }

            Random random = new Random();

            string otp =
                random.Next(
                    100000,
                    999999
                ).ToString();

            admin.Otp = otp;

            admin.OtpExpiry =
                DateTime.Now.AddMinutes(10);

            _context.SaveChanges();

            _emailService.SendOtpEmail(
    admin.email,
    otp
);

            return Ok(new
            {
                message = "OTP sent",
                adminId = admin.id
            });
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp(
    VerifyOtpRequest request)
        {
            var admin =
                _context.Admins
                .FirstOrDefault(a =>
                    a.id == request.AdminId);

            if (admin == null)
            {
                return NotFound(new
                {
                    message = "Admin not found"
                });
            }

            if (string.IsNullOrEmpty(admin.Otp))
            {
                return BadRequest(new
                {
                    message = "OTP not found"
                });
            }

            if (admin.Otp != request.Otp.Trim())
            {
                return BadRequest(new
                {
                    message = "Invalid OTP"
                });
            }

            if (admin.OtpExpiry < DateTime.Now)
            {
                return BadRequest(new
                {
                    message = "OTP expired"
                });
            }

            return Ok(new
            {
                message = "OTP verified"
            });
        }


        [HttpPost("reset-password")]
        public IActionResult ResetForgotPassword(
    ForgotResetPasswordRequest request)
        {
            var admin = _context.Admins
                .FirstOrDefault(a =>
                    a.id == request.AdminId);

            if (admin == null)
            {
                return NotFound();
            }

            admin.password =
                BCrypt.Net.BCrypt.HashPassword(
                    request.NewPassword
                );

            admin.Otp = null;
            admin.OtpExpiry = null;

            _context.SaveChanges();

            return Ok(new
            {
                message = "Password reset successful"
            });
        }
    }
}