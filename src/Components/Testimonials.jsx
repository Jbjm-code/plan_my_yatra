import { useRef, useEffect } from "react";
import styles from "../Styles/testimonial.module.css";

const testimonialsData = [
  {
    name: "Rekha Varadwaz",
    role: "CEO at Google Inc",
    image: "/user1.jpg",
    text: "Amazing travel planning experience.",
  },
  {
    name: "Paresh Rawal",
    role: "Manager at Nike Inc",
    image: "/user2.jpg",
    text: "Highly professional service.",
  },
  {
    name: "Amit Sharma",
    role: "Traveler",
    image: "/user3.jpg",
    text: "Loved the arrangements.",
  },
  {
    name: "Neha Singh",
    role: "Tourist",
    image: "/user1.jpg",
    text: "Excellent experience overall.",
  },
  {
    name: "Rohit Mehta",
    role: "Traveler",
    image: "/user2.jpg",
    text: "Very smooth booking process.",
  },
   {
    name: "Rohit Mehta",
    role: "Traveler",
    image: "/user2.jpg",
    text: "Very smooth booking process.",
  },
];

function Testimonials() {

  const scrollRef = useRef(null);

  // clone data BEFORE + AFTER (for seamless loop)
  const loopData = [
    ...testimonialsData,
    ...testimonialsData,
    ...testimonialsData,
  ];

  const getScrollAmount = () => {

    const container = scrollRef.current;

    if (!container) return 300;

    const card =
      container.querySelector(`.${styles.card}`);

    if (!card) return 300;

    const width = card.offsetWidth + 30;

    if (window.innerWidth <= 768) return width;
    if (window.innerWidth <= 1024) return width * 2;

    return width * 3;
  };

  const scrollRight = () => {

    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });

  };

  const scrollLeft = () => {

    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });

  };


  // START FROM MIDDLE (IMPORTANT FIX)

  useEffect(() => {

    const container = scrollRef.current;

    if (!container) return;

    container.scrollLeft = container.scrollWidth / 3;

  }, []);


  // CONTINUOUS AUTO LOOP RIGHT SIDE

  useEffect(() => {

    const container = scrollRef.current;

    if (!container) return;

    const interval = setInterval(() => {

      container.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });

      // invisible reset when reaching end

      if (
        container.scrollLeft >=
        (container.scrollWidth * 2) / 3
      ) {

        container.scrollLeft =
          container.scrollWidth / 3;

      }

    }, 3000);

    return () => clearInterval(interval);

  }, []);


  return (

    <section className={styles.wrapper}>

      <p className={styles.smallTitle}>
        Testimonials
      </p>

      <h2 className={styles.mainTitle}>
        Client says about us
      </h2>

      <div className={styles.sliderWrapper}>

        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={scrollLeft}
        >
          ❮
        </button>

        <div
          className={styles.cardContainer}
          ref={scrollRef}
        >

          {loopData.map((item, index) => (

            <div
              key={index}
              className={styles.card}
            >

              <img
                src={item.image}
                alt={item.name}
                className={styles.avatar}
              />

              <div className={styles.content}>

                <h4>{item.name}</h4>

                <span>{item.role}</span>

                <p>{item.text}</p>

              </div>

              <div className={styles.quote}>
                ❝
              </div>

            </div>

          ))}

        </div>

        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={scrollRight}
        >
          ❯
        </button>

      </div>

      <p className={styles.bottomText}>
        Successfully worked with them
      </p>

    </section>
  );
}

export default Testimonials;