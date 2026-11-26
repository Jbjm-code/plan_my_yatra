import { useRef, useEffect } from "react";
import styles from "../Styles/testimonial.module.css";

const testimonialsData = [
  {
    name: "Virendra Jedhe",
    role: "CEO at Google Inc",
    image: "/user2.png",
    text: "Had a very good interaction with Plan My Yatra.The itinerary was perfectly planned, hotels were excellent.definitely consider them for future travel plans.",
  },
  {
    name: "Rohan Nikharge",
    role: "Manager at Nike Inc",
    image: "/user1.png",
    text: "I recently planned my trip to McLeod Ganj & Dharamshala through PlanMyYatraa and it was a great experience. Sonal did an amazing job, patiently answered our questions and created itenary as per our budget, giving right balance of sightseeing and relaxation. I would definitely recommend Planmyyatraa to anyone looking for a reliable travel planner.",
  },
  {
    name: "Ashwini Kankariya",
    role: "Traveler",
    image: "/user3.png",
    text: "Sonal has planned my retreats in India and abroad with complete professionalism and flawless coordination. Everything is always smooth, organized, and stress-free.Beyond handling my professional retreat requirements, she has also beautifully planned my personal vacations with the same care and attention.Reliable, responsive, and genuinely committed — I highly recommend Sonal for both business and personal travel.",
  },
  {
    name: "Vipul Raulkar",
    role: "Tourist",
    image: "/user4.png",
    text: "Sonal mam planned our trip to thailand which included cities like bangkok Pattaya krabi and phuket. Totally in love with the tour packages we got and accomodation, really enjoyed our trip alot and would look forward for the upcoming adventures with plan my yatra 😃 thank you so much madam for making our first international trip memorable with lots of activities and exotic 4-5star properties all within affordable rates.",
  },
  {
    name: "Aniruddha Rao",
    role: "Traveler",
    image: "/user5.png",
    text: "Recently visited the Andamans for a special celebration, and I must say the trip organized by Sonal from PMY was absolutely commendable! The itinerary was budget-friendly, well-planned, and perfectly balanced – we had ample time to relax without feeling rushed. Every detail was thoughtfully arranged, making it a truly memorable experience.Thank you, Sonal, for the wonderful planning! I highly recommend PMY for anyone looking for a hassle-free and well-organized trip. Will definitely come back for future travel plans!",
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

    }, 10000);

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

<div className={styles.stars}>
  ★★★★★
</div>

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

    

    </section>
  );
}

export default Testimonials;