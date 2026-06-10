using Microsoft.AspNetCore.Mvc;
using travel.Data;
using travel.Models;

namespace travel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PackagesController : ControllerBase
    {
        private readonly AppDbContext _context;

    public PackagesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPackages()
        {
            return Ok(_context.Packages.ToList());
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePackage(
            int id,
            UpdatePackageRequest request
        )
        {
            var pkg = _context.Packages
                .FirstOrDefault(x => x.id == id);

            if (pkg == null)
            {
                return NotFound();
            }

            // Update package table
            pkg.title = request.title;
            pkg.price = request.price;
            pkg.oldPrice = request.oldPrice;

            // Remove old inclusions & exclusions
            var oldPoints = _context.TravelPackagePoints
                .Where(x =>
                    x.package_id == id &&
                    (x.type == "inclusion" ||
                     x.type == "exclusion"))
                .ToList();

            _context.TravelPackagePoints.RemoveRange(oldPoints);

            // Add new inclusions
            foreach (var item in request.inclusions)
            {
                _context.TravelPackagePoints.Add(
                    new TravelPackagePoint
                    {
                        package_id = id,
                        type = "inclusion",
                        text = item
                    });
            }

            // Add new exclusions
            foreach (var item in request.exclusions)
            {
                _context.TravelPackagePoints.Add(
                    new TravelPackagePoint
                    {
                        package_id = id,
                        type = "exclusion",
                        text = item
                    });
            }

            _context.SaveChanges();

            return Ok(new
            {
                message = "Package Updated"
            });
        }

        [HttpGet("{slug}")]
        public IActionResult GetPackageBySlug(string slug)
        {
            var package = _context.Packages
                .FirstOrDefault(x => x.slug == slug);

            if (package == null)
            {
                return NotFound();
            }

            var detail = _context.PackageDetails
                .FirstOrDefault(x =>
                    x.package_id == package.id);

            var highlights = _context.TravelPackagePoints
                .Where(x =>
                    x.package_id == package.id &&
                    x.type == "highlight")
                .Select(x => x.text)
                .ToList();

            var inclusions = _context.TravelPackagePoints
                .Where(x =>
                    x.package_id == package.id &&
                    x.type == "inclusion")
                .Select(x => x.text)
                .ToList();

            var exclusions = _context.TravelPackagePoints
                .Where(x =>
                    x.package_id == package.id &&
                    x.type == "exclusion")
                .Select(x => x.text)
                .ToList();

            return Ok(new
            {
                package.id,
                package.slug,
                package.title,
                package.duration,
                package.price,
                package.oldPrice,

                overview = detail?.overview,

                highlights,
                inclusions,
                exclusions
            });
        }
    }

}
