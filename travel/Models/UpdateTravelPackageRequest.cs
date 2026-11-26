namespace travel.Models
{
    public class UpdateTravelPackageRequest
    {
        public string package_name { get; set; } = "";

        public string subtitle { get; set; } = "";

        public string duration { get; set; } = "";

        public string cities_covered { get; set; } = "";

        public string ideal_for { get; set; } = "";

        public string pricing { get; set; } = "";

        public List<TourItinerary> itinerary { get; set; } = new();

        public List<PackageInclusionExclusion> inclusions { get; set; } = new();

        public List<PackageInclusionExclusion> exclusions { get; set; } = new();

        public List<PackageNote> notes { get; set; } = new();
    }
}