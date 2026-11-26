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

        // GET: api/Packages
        [HttpGet]
        public IActionResult GetPackages()
        {
            return Ok(_context.Packages.ToList());
        }

        // GET: api/Packages/1
        [HttpGet("{id:int}")]
        public IActionResult GetPackageById(int id)
        {
            var package = _context.Packages
                .FirstOrDefault(x => x.id == id);

            if (package == null)
            {
                return NotFound(new
                {
                    message = "Package not found"
                });
            }


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

                highlights,
                inclusions,
                exclusions
            });
        }

        // GET: api/Packages/slug/goa-tour-package
        [HttpGet("slug/{slug}")]
        public IActionResult GetPackageBySlug(string slug)
        {
            var package = _context.Packages
                .FirstOrDefault(x => x.slug == slug);

            if (package == null)
            {
                return NotFound(new
                {
                    message = "Package not found"
                });
            }

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

                highlights,
                inclusions,
                exclusions
            });
        }

        // PUT: api/Packages/1
        [HttpPut("{id:int}")]
        public IActionResult UpdatePackage(
            int id,
            UpdatePackageRequest request)
        {
            var pkg = _context.Packages
                .FirstOrDefault(x => x.id == id);

            if (pkg == null)
            {
                return NotFound(new
                {
                    message = "Package not found"
                });
            }

            if (!string.IsNullOrWhiteSpace(request.title))
                pkg.title = request.title;

            if (!string.IsNullOrWhiteSpace(request.price))
                pkg.price = request.price;

            if (!string.IsNullOrWhiteSpace(request.oldPrice))
                pkg.oldPrice = request.oldPrice;

            var oldPoints = _context.TravelPackagePoints
                .Where(x =>
                    x.package_id == id &&
                    (x.type == "inclusion" ||
                     x.type == "exclusion"))
                .ToList();

            _context.TravelPackagePoints.RemoveRange(oldPoints);

            foreach (var item in request.inclusions)
            {
                if (!string.IsNullOrWhiteSpace(item))
                {
                    _context.TravelPackagePoints.Add(
                        new TravelPackagePoint
                        {
                            package_id = id,
                            type = "inclusion",
                            text = item.Trim()
                        });
                }
            }

            foreach (var item in request.exclusions)
            {
                if (!string.IsNullOrWhiteSpace(item))
                {
                    _context.TravelPackagePoints.Add(
                        new TravelPackagePoint
                        {
                            package_id = id,
                            type = "exclusion",
                            text = item.Trim()
                        });
                }
            }

            _context.SaveChanges();

            return Ok(new
            {
                message = "Package Updated Successfully"
            });
        }
    }
}