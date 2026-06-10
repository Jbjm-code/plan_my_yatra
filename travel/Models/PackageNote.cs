namespace travel.Models
{
    public class PackageNote
    {
        public int id { get; set; }

        public int package_id { get; set; }

        public string note_text { get; set; } = "";
    }
}