namespace travel.Models
{
    public class VerifyOtpRequest
    {
        public int AdminId { get; set; }

        public string Otp { get; set; }
    }
}