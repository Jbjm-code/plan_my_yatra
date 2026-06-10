import styles from "../Styles/Footer.module.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className={styles.footerWrapper}>

      {/* TOP CTA STRIP */}

      <div className={styles.ctaStrip}>
        <div className={styles.ctaLeft}>
          <img src="/footer/travel.png" alt="icon" />

          <div>
            <h3>Ready To Explore And Enjoy Your Journey?</h3>
            <p>
              Discover amazing destinations with perfectly crafted travel experiences.
            </p>
          </div>
        </div>

        <button className={styles.ctaBtn}>
          Get Started →
        </button>
      </div>


      {/* MAIN FOOTER */}

      <div className={styles.footerContent}>


        {/* NEWSLETTER */}

        <div className={styles.newsletterSection}>

          {/* LOGO */}

          <img
            src="/logo.png"
            alt="logo"
            className={styles.footerLogo}
          />

          <h4>Newsletter</h4>

          <div className={styles.inputBox}>
            <input placeholder="Enter Email Address" />
            <button>➤</button>
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" />
            I agree to the Privacy Policy
          </label>

        </div>


        {/* BRAND INFO */}

        <div className={styles.linksSection}>

          <h4>TravelTour</h4>

          <p>
            Turning your travel dreams into unforgettable journeys.
          </p>

          <a href="mailto:info@traveltour.com">
            info@traveltour.com
          </a>

          <a href="tel:+919876543210">
            +91 9876543210
          </a>

          <a>
            Mumbai, India
          </a>

        </div>


        {/* PAGE LINKS */}

        <div className={styles.linksSection}>

          <h4>View Our Pages</h4>

          {/* Scroll to Contact Section */}

          <Link to="/contact">Contact</Link>

          <a href="#">
            Explore More
          </a>

          <a href="#">
            Who We Are
          </a>

          <a href="#">
            Travel Packages
          </a>

          <a href="#">
            Journey Gallery
          </a>

        </div>


        {/* GALLERY */}

        <div className={styles.gallerySection}>

          <h4>Gallery</h4>

          <div className={styles.galleryGrid}>
            <img src="/footer/uttrakhand.jpg" alt="gallery" />
            <img src="/footer/kashmir.jpg" alt="gallery" />
            <img src="/footer/delhi.jpg" alt="gallery" />
            <img src="/footer/himachal.jpg" alt="gallery" />
            <img src="/footer/ladakh.jpg" alt="gallery" />
            <img src="/footer/rajasthan.jpg" alt="gallery" />
          </div>

        </div>


      </div>


      {/* COPYRIGHT */}

      <div className={styles.bottomBar}>
        © 2026 TravelTour. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;