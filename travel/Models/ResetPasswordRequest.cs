namespace travel.Models
{
    public class ResetPasswordRequest
    {
        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }

        public string ConfirmPassword { get; set; }
    }
}