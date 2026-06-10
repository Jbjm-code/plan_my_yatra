namespace travel.Models
{
    public class UpdatePackageRequest
    {
        public string title { get; set; } = "";

        public string price { get; set; } = "";

        public string? oldPrice { get; set; }

        public List<string> inclusions { get; set; } = new();

        public List<string> exclusions { get; set; } = new();
    }
}