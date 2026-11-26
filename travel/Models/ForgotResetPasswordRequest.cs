namespace travel.Models
{
    public class ForgotResetPasswordRequest
    {
        public int AdminId { get; set; }

        public string NewPassword { get; set; }
    }
}