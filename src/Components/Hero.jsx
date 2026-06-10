import { useEffect, useRef, useState } from "react";
import styles from "../Styles/hero.module.css";

const slides = [
  {
    type: "video",
    src: "/hero/india.mp4",
    title: "Mega Holiday Offer",
    subtitle: "Get up to 25% Value Back",
    price: "",
  },
  
  {
    type: "video",
    src: "/hero/nature.mp4",
    title: "Plan Your Perfect Trip Today",
    subtitle: "Where Every Stop Tells a Story",
    price: "",
  },
  {
    type: "video",
    src: "/hero/temple.mp4",
    title: "Plan ahead, Travel Stress-free",
    subtitle: "FREE Rescheduling & Cancellation",
    price: "",
  },
  {
    type: "video",
    src: "/hero/tajmahal.mp4",
    title: "Your Dream Destination Awaits",
    subtitle: "Crafted Spiritual Experiences",
    price: "",
  },
  {
    type: "video",
    src: "/hero/world.mp4",
    title: "Discover the World, One Journey at a Time",
    subtitle:
      "Explore breathtaking destinations, curated holiday packages, and unforgettable experiences designed just for you.",
    price: "₹86,360",
  },
  {
    type: "image",
    src: "/hero/banars.jpg",
    title: "Experience the Timeless Soul of Banaras",
    subtitle:
      "Walk through ancient ghats, witness the divine Ganga Aarti, and explore spiritual traditions that have lived for thousands of years.",
    price: "",
  },
  {
    type: "image",
    src: "/hero/family.jpg",
    title: "Travel Together, Stay Together, Enjoy Together",
    subtitle:
      "Enjoy comfortable stays, exciting destinations, and carefully planned tours perfect for every member of your family. ✨",
    price: "₹33,960",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  const imageTimer = useRef(null);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  /* IMAGE AUTO SWITCH (ONLY FOR IMAGES) */

  useEffect(() => {
    if (slides[current].type === "image") {
      imageTimer.current = setTimeout(() => {
        nextSlide();
      }, 4000);
    }

    return () => clearTimeout(imageTimer.current);
  }, [current]);

  return (
    <div className={styles.heroWrapper}>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === current ? styles.active : ""
          }`}
        >
          {index === current && slide.type === "video" ? (
            <video
              key={slide.src}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={nextSlide}
            >
              <source src={slide.src} type="video/mp4" />
            </video>
          ) : slide.type === "image" ? (
            <img src={slide.src} alt="" />
          ) : null}

          <div className={styles.overlay}>
            <h1>{slide.title}</h1>

            <p>{slide.subtitle}</p>

            {slide.price && (
              <span className={styles.price}>
                Holidays Starting at {slide.price}
              </span>
            )}

          </div>
        </div>
      ))}

{/* Fixed Company Banner */}

<div className={styles.companyBanner}>
  <h2>PMY</h2>
  <p>Plan My Yatraa</p>
</div>

      {/* PREV NEXT BUTTONS */}

      <button
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      >
        ❮
      </button>

      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      >
        ❯
      </button>

      {/* DOTS */}

      <div className={styles.dots}>
        {slides.map((_, i) => (
          <span
            key={i}
            className={
              i === current ? styles.activeDot : ""
            }
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>

    </div>
  );
}

export default Hero;