import React, { useEffect, useRef } from "react";
import styles from "../Styles/AboutUs.module.css";
import {
  FaShieldAlt,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";

const galleryImages = [
  "/about/about1.jpg",
   "/about/about2.jpg",
    "/about/about3.jpg",
 "/about/about4.jpg",
 "/about/about5.jpg",
 "/about/about6.jpg"
];
 
const AboutUs = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const interval = setInterval(() => {
      if (slider) {
        slider.scrollLeft += 320;

        if (
          slider.scrollLeft + slider.clientWidth >=
          slider.scrollWidth
        ) {
          slider.scrollLeft = 0;
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.aboutPage}>
      
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        >
         <source
  src="/about/video2.mp4"
  type="video/mp4"
/>
        </video>

        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>About Us</h1>

          <p>
            Explore the world with trusted travel experts and unforgettable
            journeys.
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutLeft}>
          <h2>
            We Are Very Trusted Tour And Travel Agency,
            Standing For You All
          </h2>

          <div className={styles.featuresRow}>
            <span>✔ Affordable Prices</span>
            <span>✔ Private Comfort</span>
          </div>

          <p>
            We create memorable travel experiences with professional
            tour planning, safe journeys, affordable packages,
            and premium customer support.
          </p>

          <div className={styles.statsContainer}>
            <div className={styles.statBox}>
              <h3>15+</h3>
              <p>Years Experience</p>
            </div>

            <div className={styles.statBox}>
              <h3>10K+</h3>
              <p>Happy Travelers</p>
            </div>
          </div>
        </div>

        <div className={styles.aboutRight}>
          <img
           src="/about/about.jpg"
            alt="travel"
          />
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section className={styles.serviceSection}>
        <div className={styles.serviceImage}>
          <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        >
         <source
  src="/about/video3.mp4"
  type="video/mp4"
/>
        </video>
        </div>

        <div className={styles.serviceCard}>
          <FaMapMarkedAlt className={styles.icon} />

          <h3>Tours Guide</h3>

          <p>
            Expert guides helping you explore beautiful destinations.
          </p>
        </div>

        <div className={styles.serviceCard}>
          <FaShieldAlt className={styles.icon} />

          <h3>Safety Safe</h3>

          <p>
            Safe travel experiences with secure transportation.
          </p>
        </div>

        <div className={styles.serviceCard}>
          <FaMoneyBillWave className={styles.icon} />

          <h3>Clear Price</h3>

          <p>
            Transparent pricing without hidden charges.
          </p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className={styles.gallerySection}>
        <div className={styles.galleryHeader}>
          <h2>Our Travel Gallery</h2>

          <p>
            Beautiful destinations captured from our journeys.
          </p>
        </div>

        <div className={styles.gallerySlider} ref={sliderRef}>
          {galleryImages.map((img, index) => (
            <div className={styles.galleryCard} key={index}>
              <img src={`${img}?w=800`} alt="gallery" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;