import styles from "../Styles/Footer.module.css";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaCheckCircle,
  FaSuitcaseRolling,
  FaTags,
  FaHeadset,
  FaClock,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaChevronRight,
} from "react-icons/fa";

function Footer() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {

    if (location.pathname === "/") {

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } else {

      navigate("/");

      setTimeout(() => {

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      }, 100);

    }

  };

  return (

    <footer className={styles.footerWrapper}>

      {/* ========================= */}
      {/* MAIN FOOTER */}
      {/* ========================= */}

      <div className={styles.footerContent}>

        {/* =================================== */}
        {/* COLUMN 1 */}
        {/* =================================== */}

        <div className={styles.leftSection}>

          <img
            src="/logo2.png"
            alt="Plan My Yatraa"
            className={styles.footerLogo}
            onClick={handleLogoClick}
          />

          {/* Gallery Below Logo */}

          <div className={styles.galleryGrid}>

            <img
              src="/footer/uttrakhand.jpg"
              alt=""
            />

            <img
              src="/footer/kashmir.jpg"
              alt=""
            />

            <img
              src="/footer/delhi.jpg"
              alt=""
            />

            <img
              src="/footer/himachal.jpg"
              alt=""
            />

            <img
              src="/footer/ladakh.jpg"
              alt=""
            />

            <img
              src="/footer/rajasthan.jpg"
              alt=""
            />

          </div>

        </div>

        {/* =================================== */}
        {/* COLUMN 2 */}
        {/* =================================== */}

        <div className={styles.linksSection}>

          <h4>TravelTour</h4>

          <p>
            Turning your travel dreams into unforgettable journeys.
          </p>

          <a href="mailto:planmyyatraa@gmail.com">

            <FaEnvelope />

            <span>
              planmyyatraa@gmail.com
            </span>

          </a>

          <a href="tel:+919067777990">

            <FaPhoneAlt />

            <span>
              +91 9067777990
            </span>

          </a>

          <a>

            <FaMapMarkerAlt />

            <span>
              Karve Road, Pune
            </span>

          </a>

        </div>

        {/* =================================== */}
        {/* COLUMN 3 */}
        {/* =================================== */}

        <div className={styles.linksSection}>

          <h4>
            View Our Pages
          </h4>

          <Link to="/">
            <FaChevronRight />
            Home
          </Link>

          <Link to="/about">
            <FaChevronRight />
            About Us
          </Link>

          <Link to="/contact">
            <FaChevronRight />
            Contact
          </Link>

        </div>

        {/* =================================== */}
        {/* COLUMN 4 */}
        {/* =================================== */}

        <div className={styles.socialSection}>

          <h4>
            Connect With Us
          </h4>

          <p>
            Follow us on social media for travel deals,
            destination updates and exciting offers.
          </p>

          <div className={styles.socialIcons}>

            <a
  href="https://www.facebook.com/PMYTours"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaFacebookF />
</a>

          <a
  href="https://www.instagram.com/plan_my_yatra/"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaInstagram />
</a>


            <a
  href="https://wa.me/919067777990"
  target="_blank"
  rel="noopener noreferrer"
>
  <FaWhatsapp />
</a>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* COPYRIGHT */}
      {/* ========================= */}

    <div className={styles.bottomBar}>

  © {new Date().getFullYear()} <strong>Plan My Yatra</strong>. All Rights Reserved.

</div>

    </footer>

  );

}

export default Footer;