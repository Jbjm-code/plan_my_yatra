import styles from "../Styles/RegionDestinations.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const data = {
  North: [
  {
    title: "North India",
    id: "north-india",
    packages: "6 TOUR PACKAGES",
    image: "/regions/north/north.jpg",
    large: true,
  },

  {
    title: "Kashmir Delight",
    id: "kashmir-delight",
    packages: "4N / 5D",
    image: "/regions/north/kashmir.jpg",
  },

  {
    title: "Kashmir Grand Tour",
    id: "kashmir-tour",
    packages: "6N / 7D",
    image: "/regions/north/kashmir1.jpg",
  },

  {
    title: "Uttarakhand Nature Trail",
    id: "uttarakhand-nature-trail",
    packages: "6N / 7D",
    image: "/regions/north/uttrakhand.jpg",
  },

  {
    title: "Royal Rajasthan",
    id: "royal-rajasthan",
    packages: "5N / 6D",
    image: "/regions/north/rajasthan.jpg",
  },

  {
    title: "Rajasthan Heritage Circuit",
    id: "rajasthan-heritage-circuit",
    packages: "7N / 8D",
    image: "/regions/north/rajasthan1.jpg",
  },

  {
    title: "Ultimate Ladakh",
    id: "ultimate-ladakh",
    packages: "7N / 8D",
    image: "/regions/north/ladakh.jpg",
  },
],

  South: [
  {
    title: "South India",
    id: "south-india",
    packages: "5 TOUR PACKAGES",
    image: "/regions/south/south.png",
    large: true,
  },

  {
    title: "Kerala Delight",
    id: "kerala-delight",
    packages: "4N / 5D",
    image: "/regions/south/kerala.png",
  },

  {
    title: "Kerala Complete",
    id: "kerala-complete",
    packages: "6N / 7D",
    image: "/regions/south/kerala1.jpg",
  },

  {
    title: "Coorg Ooty Escape",
    id: "coorg-ooty-escape",
    packages: "4N / 5D",
    image: "/regions/south/ooty.jpg",
  },

  {
    title: "Mysore Coorg Ooty Holiday",
    id: "mysore-coorg-ooty-holiday",
    packages: "6N / 7D",
    image: "/regions/south/ooty1.jpg",
  },

  {
    title: "Ooty Kodaikanal Hills",
    id: "ooty-kodaikanal-hills",
    packages: "4N / 5D",
    image: "/regions/south/ooty2.jpg",
  },
],

  East: [
  {
    title: "East India",
    id: "east-india",
    packages: "5 TOUR PACKAGES",
    image: "/regions/east/east.jpg",
    large: true,
  },

  {
    title: "Classic Sikkim Darjeeling",
    id: "classic-sikkim-darjeeling",
    packages: "5N / 6D",
    image: "/regions/east/sikkim1.jpg",
  },

  {
    title: "Premium Sikkim Darjeeling",
    id: "premium-sikkim-darjeeling-lachung",
    packages: "7N / 8D",
    image: "/regions/east/sikkim2.jpg",
  },

  {
    title: "Meghalaya Escape",
    id: "meghalaya-escape",
    packages: "5N / 6D",
    image: "/regions/east/meghalay.jpg",
  },

  {
    title: "Assam Meghalaya Explorer",
    id: "assam-meghalaya-explorer",
    packages: "7N / 8D",
    image: "/regions/east/aasam.jpg",
  },

  {
    title: "Odisha Temple & Beach Tour",
    id: "odisha-temple-beach-tour",
    packages: "4N / 5D",
    image: "/regions/east/odisa.jpg",
  },
],

  West: [
  {
    title: "West India",
    id: "west-india",
    packages: "4 TOUR PACKAGES",
    image: "/regions/west/west.png",
    large: true,
  },

  {
    title: "Goa Getaway",
    id: "goa-getaway",
    packages: "3N / 4D",
    image: "/regions/west/goa1.jpg",
  },

  {
    title: "Goa Premium North & South",
    id: "goa-premium-north-south",
    packages: "5N / 6D",
    image: "/regions/west/goa.jpg",
  },

  {
    title: "Statue of Unity Short Tour",
    id: "statue-of-unity-short-tour",
    packages: "3N / 4D",
    image: "/regions/west/unity.jpg",
  },

  {
    title: "Gujarat Heritage & Wildlife",
    id: "gujarat-heritage-wildlife",
    packages: "7N / 8D",
    image: "/regions/west/gujrat.jpg",
  },
],

  Central: [
  {
    title: "Central India",
    id: "central-india",
    packages: "3 TOUR PACKAGES",
    image: "/regions/central/central.png",
    large: true,
  },

  {
    title: "Ujjain Omkareshwar Darshan",
    id: "ujjain-omkareshwar-jyotirlinga-darshan",
    packages: "3N / 4D",
    image:"/regions/central/ujjain.jpg",
  },

  {
    title: "MP Heritage Circuit",
    id: "mp-heritage-circuit",
    packages: "6N / 7D",
    image: "/regions/central/mp.jpg",
  },

  {
    title: "Kanha Bandhavgarh Wildlife Tour",
    id: "kanha-bandhavgarh-wildlife-tour",
    packages: "6N / 7D",
    image: "/regions/central/kanha.jpg",
  },
],
};

export default function RegionDestinations() {
 const [activeTab, setActiveTab] = useState(
  localStorage.getItem("activeRegion") || "North"
);

useEffect(() => {
  localStorage.setItem(
    "activeRegion",
    activeTab
  );
}, [activeTab]);
  const tabs = ["North", "South", "East", "West", "Central"];

  useEffect(() => {
  const handlePageReload = () => {
    localStorage.removeItem("activeRegion");
  };

  window.addEventListener("beforeunload", handlePageReload);

  return () => {
    window.removeEventListener("beforeunload", handlePageReload);
  };
}, []);
  
return (
  <section className={styles.wrapper}>
    <h2 className={styles.heading}>
      Explore Top Destinations by Region
    </h2>

    {/* TABS */}

    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <span
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`${styles.tab} ${
            activeTab === tab ? styles.active : ""
          }`}
        >
          {tab} India
        </span>
      ))}
    </div>

    {/* GRID */}

    <div className={styles.grid}>
      {data[activeTab].map((item, index) => {

        // Large Region Image (NOT CLICKABLE)
        if (item.large) {
          return (
            <div
              key={index}
              className={`${styles.card} ${styles.largeCard}`}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className={styles.overlay}>
                <h3>{item.title}</h3>
                <span>{item.packages}</span>
              </div>
            </div>
          );
        }

        // Package Cards (CLICKABLE)
        return (
          <Link
           to={`/state-package/${item.id}`}
            key={index}
            className={styles.card}
          >
            <img
              src={item.image}
              alt={item.title}
            />

            <div className={styles.overlay}>
              <h3>{item.title}</h3>
              <span>{item.packages}</span>
            </div>
          </Link>
        );
      })}
    </div>
  </section>
);
}