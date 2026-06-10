import { useRef } from "react";
import styles from "../Styles/TrendingDestinations.module.css";

const destinations = [
  {
    title: "Taj Mahal Heritage Tour (Agra)",
    image: "/trending/taj.jpg",
  },
  {
    title: "Golden Temple Pilgrimage (Amritsar)",
    image: "/trending/golden.png",
  },
  {
    title: "Hampi Ancient Kingdom Experience",
    image: "/trending/hampri.jpg",
  },
  {
    title: "Mysore Royal Palace Experience",
    image: "/trending/palace.jpg",
  },
  {
    title: "Ajanta-Ellora Heritage Trail",
    image: "/trending/ajantha.jpg",
  },
];

function TrendingDestinations() {
  const sliderRef = useRef();

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -420,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 420,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.wrapper}>
      {/* HEADER */}
      <div className={styles.header}>
        <h2>Discover the Beauty of India</h2>

        <p>
        Discover the rich heritage, natural wonders, and vibrant cultures that make India truly unique. From picturesque hill stations and golden deserts to pristine beaches and sacred cities, find your perfect travel experience across the nation.
         
        </p>
      </div>

      {/* SLIDER */}
      <div className={styles.sliderWrapper}>
        <button
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={scrollLeft}
        >
          ❮
        </button>

        <div className={styles.cardContainer} ref={sliderRef}>
          {destinations.map((item, index) => (
            <div className={styles.card} key={index}>
              <img src={item.image} alt="" />

              <h4>{item.title}</h4>

             
            </div>
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={scrollRight}
        >
          ❯
        </button>
      </div>
    </section>
  );
}

export default TrendingDestinations;