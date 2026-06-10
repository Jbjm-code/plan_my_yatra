namespace travel.Models
{
    public class Package
    {
        public int id { get; set; }

        public string slug { get; set; } = "";

        public string title { get; set; } = "";

        public string duration { get; set; } = "";

        public string price { get; set; } = "";

        public string? inclusions { get; set; }

        public string? oldPrice { get; set; }
    }
}