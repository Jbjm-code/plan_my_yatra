import { useRef, useState } from "react";
import styles from "../Styles/SeasonSection.module.css";
import { useNavigate } from "react-router-dom";

const seasonData = {
  summer: {
    video: "/season/video.mp4",
    text: "Feel the summer vibes with our exclusive holiday packages!",
    desc: "Enjoy beaches, city escapes and sunshine adventures.",
    packages: [
      {
        title: "Bali Escape",
        id: "bali",
        days: "5 Days",
        price: "₹ 26,900",
        oldPrice: "₹ 32,000",
        image: "/recommonded/bali.png",
      },
      {
        title: "Dubai Tour",
        id: "dubai",
        days: "4 Days",
        price: "₹ 45,000",
        oldPrice: "₹ 52,000",
        image: "/recommonded/dubai.png",
      },
      {
        title: "Goa Trip",
        id: "goa-getaway",
        days: "3 Days",
        price: "₹ 15,000",
        oldPrice: "₹ 18,000",
        image: "/season/goa.jpg",
      },
      {
        title: "Thailand",
        id: "thailand",
        days: "5 Days",
        price: "₹ 39,000",
        oldPrice: "₹ 45,000",
        image: "/recommonded/thailand.png",
      },
    ],
  },

  winter: {
    video: "/season/video1.mp4",
    text: "Enjoy magical winter destinations and snowfall!",
    desc: "Explore snowy mountains and cozy stays.",
    packages: [
      {
        title: "Kashmir",
        id: "kashmir-delight",
        days: "5 Days",
        price: "₹ 18,000",
        oldPrice: "₹ 22,000",
        image: "/season/manali.jpg",
      },
      {
        title: "Kashmir Paradise",
        id: "kashmir-tour",
        days: "6 Days",
        price: "₹ 25,000",
        oldPrice: "₹ 30,000",
        image: "/season/kashmir.jpg",
      },
      {
        title: "Aasam Meghalaya",
        id: "assam-meghalaya-explorer",
        days: "4 Days",
        price: "₹ 20,000",
        oldPrice: "₹ 26,000",
        image: "/season/auli.jpg",
      },
      {
        title: "Ooty Kodaikanal",
        id: "ooty-kodaikanal-hills",
        days: "7 Days",
        price: "₹ 1,20,000",
        oldPrice: "₹ 1,40,000",
        image: "/regions/south/ooty2.jpg",
      },
    ],
  },

  monsoon: {
    video: "/season/video2.mp4",
    text: "Romantic monsoon getaways with lush greenery!",
    desc: "Enjoy waterfalls, hills and fresh nature.",
    packages: [
      {
        title: "Kerala Monsoon",
        id: "kerala-delight",
        days: "6 Days",
        price: "₹ 28,000",
        oldPrice: "₹ 34,000",
        image: "/season/kerala.png",
      },
      {
        title: "Meghalaya Tour",
        id: "meghalaya-escape",
        days: "5 Days",
        price: "₹ 30,000",
        oldPrice: "₹ 36,000",
        image: "/season/meghalaya.jpg",
      },
      {
        title: "Coorg Hills",
        id: "coorg-ooty-escape",
        days: "4 Days",
        price: "₹ 18,500",
        oldPrice: "₹ 22,000",
        image: "/season/coora.png",
      },
      {
        title: "Kerala complete",
        id: "kerala-complete",
        days: "3 Days",
        price: "₹ 12,000",
        oldPrice: "₹ 15,000",
        image: "/regions/south/kerala.png",
      },
    ],
  },
};

function SeasonSection() {
  const [active, setActive] = useState("summer");
  const scrollRef = useRef(null);
const navigate = useNavigate();
  const data = seasonData[active];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles.wrapper}>

      {/* VIDEO CHANGE */}
      <video key={data.video} autoPlay muted loop playsInline className={styles.bgVideo}>
        <source src={data.video} type="video/mp4" />
      </video>

      <div className={styles.overlay}></div>

      <div className={styles.container}>

        <h2 className={styles.heading}>
          Not Sure When to Go or Where to Go?
        </h2>

        {/* TABS */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${active === "winter" ? styles.active : ""}`}
            onClick={() => setActive("winter")}
          >
            ❄ Winter
          </button>

          <button
            className={`${styles.tab} ${active === "summer" ? styles.active : ""}`}
            onClick={() => setActive("summer")}
          >
            ☀ Summer
          </button>

          <button
            className={`${styles.tab} ${active === "monsoon" ? styles.active : ""}`}
            onClick={() => setActive("monsoon")}
          >
            🌧 Monsoon
          </button>
        </div>

        {/* MAIN */}
        <div className={styles.flexRow}>

          {/* LEFT TEXT */}
          <div className={styles.leftBox}>
            <h3>{data.text}</h3>
            <p>{data.desc}</p>
          </div>

          {/* SLIDER */}
          <div className={styles.sliderWrapper}>

            <button className={`${styles.arrow} ${styles.left}`} onClick={scrollLeft}>❮</button>

            <div className={styles.cardContainer} ref={scrollRef}>
              {data.packages.map((item, i) => (
                <div
  className={styles.card}
  key={i}
  onClick={() => {

    const internationalPackages = [
      "bali",
      "dubai",
      "thailand"
    ];

    if (internationalPackages.includes(item.id)) {
      navigate(`/package/${item.id}`);
    } else {
      navigate(`/state-package/${item.id}`);
    }

  }}
>
                  <img src={item.image} alt="" />

                 <div className={styles.topRow}>
  <h4>{item.title}</h4>

  <span className={styles.oldPrice}>
    {item.oldPrice}
  </span>
</div>

<div className={styles.bottomRow}>
  <span className={styles.days}>
    {item.days}
  </span>

  <strong className={styles.newPrice}>
    {item.price}
  </strong>
</div>
                </div>
              ))}
            </div>

            <button className={`${styles.arrow} ${styles.right}`} onClick={scrollRight}>❯</button>

          </div>

        </div>
      </div>
    </section>
  );
}

export default SeasonSection;