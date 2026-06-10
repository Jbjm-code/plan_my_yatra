using Microsoft.AspNetCore.Mvc;
using travel.Data;
using travel.Models;
using System.Text.Json;

namespace travel.Controllers
{
    [ApiController]
    [Route("api/travel-package")]
    public class TravelPackageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TravelPackageController(
            AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("{slug}")]
        public IActionResult GetPackage(
            string slug)
        {
            var package =
                _context.TravelPackages
                .FirstOrDefault(x =>
                    x.slug == slug);

            if (package == null)
            {
                return NotFound();
            }

            var itinerary =
                _context.TourItineraries
                .Where(x =>
                    x.package_id ==
                    package.id)
                .OrderBy(x =>
                    x.day_no)
                .ToList();

            var inclusions =
                _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id ==
                    package.id &&
                    x.item_type ==
                    "inclusion")
                .Select(x =>
                    x.item_text)
                .ToList();

            var exclusions =
                _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id ==
                    package.id &&
                    x.item_type ==
                    "exclusion")
                .Select(x =>
                    x.item_text)
                .ToList();

            var notes =
                _context.PackageNotes
                .Where(x =>
                    x.package_id ==
                    package.id)
                .Select(x =>
                    x.note_text)
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

        [HttpPut("{slug}")]
        public IActionResult UpdatePackage(
            string slug,
            [FromBody] JsonElement data
        )
        {
            var package =
                _context.TravelPackages
                .FirstOrDefault(x =>
                    x.slug == slug);

            if (package == null)
            {
                return NotFound();
            }

            package.package_name =
                data.GetProperty("package_name")
                .GetString() ?? "";

            package.subtitle =
                data.GetProperty("subtitle")
                .GetString() ?? "";

            package.duration =
                data.GetProperty("duration")
                .GetString() ?? "";

            package.cities_covered =
                data.GetProperty("cities_covered")
                .GetString() ?? "";

            package.ideal_for =
                data.GetProperty("ideal_for")
                .GetString() ?? "";

            package.pricing =
                data.GetProperty("pricing")
                .GetString() ?? "";

            // Update Itinerary

            var itineraryArray =
                data.GetProperty("itinerary");

            foreach (var item in itineraryArray.EnumerateArray())
            {
                int itineraryId =
                    item.GetProperty("id")
                    .GetInt32();

                var dbItem =
                    _context.TourItineraries
                    .FirstOrDefault(x =>
                        x.id == itineraryId);

                if (dbItem != null)
                {
                    dbItem.day_no =
                        item.GetProperty("day_no")
                        .GetInt32();

                    dbItem.day_title =
                        item.GetProperty("day_title")
                        .GetString() ?? "";

                    dbItem.day_description =
                        item.GetProperty("day_description")
                        .GetString() ?? "";
                }
            }

            // Update Inclusions

            var inclusionList =
                _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id == package.id &&
                    x.item_type == "inclusion")
                .ToList();

            var inclusionArray =
                data.GetProperty("inclusions");

            for (
                int i = 0;
                i < inclusionList.Count &&
                i < inclusionArray.GetArrayLength();
                i++
            )
            {
                inclusionList[i].item_text =
                    inclusionArray[i].GetString() ?? "";
            }

            // Update Exclusions

            var exclusionList =
                _context.PackageInclusionExclusions
                .Where(x =>
                    x.package_id == package.id &&
                    x.item_type == "exclusion")
                .ToList();

            var exclusionArray =
                data.GetProperty("exclusions");

            for (
                int i = 0;
                i < exclusionList.Count &&
                i < exclusionArray.GetArrayLength();
                i++
            )
            {
                exclusionList[i].item_text =
                    exclusionArray[i].GetString() ?? "";
            }

            // Update Notes

            var noteList =
                _context.PackageNotes
                .Where(x =>
                    x.package_id == package.id)
                .ToList();

            var noteArray =
                data.GetProperty("notes");

            for (
                int i = 0;
                i < noteList.Count &&
                i < noteArray.GetArrayLength();
                i++
            )
            {
                noteList[i].note_text =
                    noteArray[i].GetString() ?? "";
            }

            _context.SaveChanges();

            return Ok(new
            {
                message =
                    "Package Updated Successfully"
            });
        }
    }
}