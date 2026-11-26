using Microsoft.AspNetCore.Mvc;
using travel.Data;
using travel.Models;

namespace travel.Controllers
{
    [ApiController]
    [Route("api/travel-package")]
    public class TravelPackageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TravelPackageController(AppDbContext context)
        {
            _context = context;
        }

        // ===========================
        // GET PACKAGE
        // ===========================

        [HttpGet("{slug}")]
        public IActionResult GetPackage(string slug)
        {
            var package = _context.TravelPackages
                .FirstOrDefault(x => x.slug == slug);

            if (package == null)
            {
                return NotFound();
            }

            var itinerary = _context.TourItineraries
                .Where(x => x.package_id == package.id)
                .OrderBy(x => x.day_no)
                .ToList();

            var inclusions =
_context.PackageInclusionExclusions
.Where(x =>
x.package_id == package.id &&
x.item_type == "inclusion")
.ToList();

            var exclusions = _context.PackageInclusionExclusions
.Where(x =>
x.package_id == package.id &&
x.item_type == "exclusion")
.ToList();

            var notes = _context.PackageNotes
     .Where(x => x.package_id == package.id)
     .ToList();

            return Ok(new
            {
                package.id,
                package.slug,
                package.package_name,
                package.subtitle,
                package.duration,
                package.cities_covered,
                package.ideal_for,
                package.pricing,

                itinerary,
                inclusions,
                exclusions,
                notes
            });
        }

        // ===========================
        // UPDATE PACKAGE
        // ===========================

        [HttpPut("{slug}")]
        public IActionResult UpdatePackage(
            string slug,
            [FromBody] UpdateTravelPackageRequest request)
        {
            var package = _context.TravelPackages
                .FirstOrDefault(x => x.slug == slug);

            if (package == null)
            {
                return NotFound(new
                {
                    message = "Package not found"
                });
            }

            // Basic Details Update

            if (!string.IsNullOrWhiteSpace(request.package_name))
                package.package_name = request.package_name;

            if (!string.IsNullOrWhiteSpace(request.subtitle))
                package.subtitle = request.subtitle;

            if (!string.IsNullOrWhiteSpace(request.duration))
                package.duration = request.duration;

            if (!string.IsNullOrWhiteSpace(request.cities_covered))
                package.cities_covered = request.cities_covered;

            if (!string.IsNullOrWhiteSpace(request.ideal_for))
                package.ideal_for = request.ideal_for;

            if (!string.IsNullOrWhiteSpace(request.pricing))
                package.pricing = request.pricing;

            // Existing Lists

            var inclusionList = _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id == package.id &&
                    x.item_type == "inclusion")
                .ToList();

            var exclusionList = _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id == package.id &&
                    x.item_type == "exclusion")
                .ToList();

            var noteList = _context.PackageNotes
                .Where(x =>
                    x.package_id == package.id)
                .ToList();

            var itineraryList = _context.TourItineraries
                .Where(x =>
                    x.package_id == package.id)
                .ToList();

            // Continue in Part 2...

            // ===========================
            // UPDATE ITINERARY
            // ===========================

            _context.TourItineraries.RemoveRange(itineraryList);

            foreach (var item in request.itinerary)
            {
                _context.TourItineraries.Add(
    new TourItinerary
    {
        package_id = package.id,
        day_no = item.day_no,
        day_title = item.day_title,
        day_subtitle = item.day_subtitle,
        day_description = item.day_description
    });
            }

            // ===========================
            // UPDATE INCLUSIONS
            // ===========================

            _context.PackageInclusionExclusions.RemoveRange(inclusionList);
            foreach (var item in request.inclusions)
            {
                if (!string.IsNullOrWhiteSpace(item.item_text))
                {
                    _context.PackageInclusionExclusions.Add(
                        new PackageInclusionExclusion
                        {
                            package_id = package.id,
                            item_type = "inclusion",
                            item_text = item.item_text.Trim()
                        });
                }
            }

            // ===========================
            // UPDATE EXCLUSIONS
            // ===========================

            _context.PackageInclusionExclusions.RemoveRange(exclusionList);

            foreach (var item in request.exclusions)
            {
                if (!string.IsNullOrWhiteSpace(item.item_text))
                {
                    _context.PackageInclusionExclusions.Add(
                        new PackageInclusionExclusion
                        {
                            package_id = package.id,
                            item_type = "exclusion",
                            item_text = item.item_text.Trim()
                        });
                }
            }

            // ===========================
            // UPDATE NOTES
            // ===========================

            _context.PackageNotes.RemoveRange(noteList);

            foreach (var item in request.notes)
            {
                if (!string.IsNullOrWhiteSpace(item.note_text))
                {
                    _context.PackageNotes.Add(
                        new PackageNote
                        {
                            package_id = package.id,
                            note_text = item.note_text.Trim()
                        });
                }
            }

            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                message = "Package Updated Successfully"
            });


        }
    }
}