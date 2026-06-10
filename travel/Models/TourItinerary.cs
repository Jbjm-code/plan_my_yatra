namespace travel.Models
{
    public class TourItinerary
    {
        public int id { get; set; }

        public int package_id { get; set; }

        public int day_no { get; set; }

        public string day_title { get; set; } = "";

        public string day_subtitle { get; set; } = "";

        public string day_description { get; set; } = "";
    }
}