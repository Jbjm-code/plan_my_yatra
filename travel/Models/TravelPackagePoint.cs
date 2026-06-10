using System.ComponentModel.DataAnnotations.Schema;

namespace travel.Models
{
    public class TravelPackagePoint
    {
        public int id { get; set; }

        public int package_id { get; set; }

        public string type { get; set; } = "";

        [Column("point_text")]
        public string text { get; set; } = "";
    }
}