namespace travel.Models
{
    public class PackageInclusionExclusion
    {
        public int id { get; set; }

        public int package_id { get; set; }

        public string item_type { get; set; } = "";

        public string item_text { get; set; } = "";
    }
}