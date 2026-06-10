using Microsoft.EntityFrameworkCore;
using travel.Models;

namespace travel.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(
            DbContextOptions<AppDbContext> options
        ) : base(options)
        {
        }

        // Existing Tables

        public DbSet<Admin> Admins { get; set; }

        public DbSet<Package> Packages { get; set; }

        public DbSet<PackageDetail> PackageDetails { get; set; }

        public DbSet<TravelPackagePoint> TravelPackagePoints { get; set; }

        // New Travel Package Tables

        public DbSet<TravelPackage> TravelPackages { get; set; }

        public DbSet<TourItinerary> TourItineraries { get; set; }

        public DbSet<PackageInclusionExclusion>
            PackageInclusionExclusions
        { get; set; }

        public DbSet<PackageNote>
            PackageNotes
        { get; set; }

        protected override void OnModelCreating(
            ModelBuilder modelBuilder
        )
        {
            modelBuilder.Entity<Admin>()
                .ToTable("admins");

            modelBuilder.Entity<Package>()
                .ToTable("packages");

            modelBuilder.Entity<PackageDetail>()
                .ToTable("package_details");

            modelBuilder.Entity<TravelPackagePoint>()
                .ToTable("package_points");

            // New Tables

            modelBuilder.Entity<TravelPackage>()
                .ToTable("travel_packages");

            modelBuilder.Entity<TourItinerary>()
                .ToTable("tour_itinerary");

            modelBuilder.Entity<PackageInclusionExclusion>()
                .ToTable("package_inclusions_exclusions");

            modelBuilder.Entity<PackageNote>()
                .ToTable("package_notes");
        }
    }
}