using MailKit.Net.Smtp;
using MimeKit;

namespace travel.Services
{
    public class EmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendOtpEmail(string toEmail, string otp)
        {
            var message = new MimeMessage();

            message.From.Add(
                MailboxAddress.Parse(
                    _config["EmailSettings:Email"]
                ));

            message.To.Add(
                MailboxAddress.Parse(toEmail));

            message.Subject = "Password Reset OTP";

            message.Body =
                new TextPart("plain")
                {
                    Text = $"Your OTP is: {otp}"
                };

            using var client = new SmtpClient();

            client.Connect(
                "smtp.gmail.com",
                587,
                false);

            client.Authenticate(
                _config["EmailSettings:Email"],
                _config["EmailSettings:Password"]);

            client.Send(message);

            client.Disconnect(true);
        }
    }
}