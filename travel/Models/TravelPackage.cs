namespace travel.Models
{
    public class TravelPackage
    {
        public int id { get; set; }

        public string slug { get; set; } = "";

        public string package_name { get; set; } = "";

        public string subtitle { get; set; } = "";

        public string duration { get; set; } = "";

        public string cities_covered { get; set; } = "";

        public string ideal_for { get; set; } = "";

        public string pricing { get; set; } = "";
    }
}