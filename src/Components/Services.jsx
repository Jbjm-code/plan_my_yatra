import styles from "../Styles/Services.module.css";

const services = [
  {
    title: "Packages Offered",
    desc: "Explore a wide range of Domestic Packages and International Packages tailored for family vacations, honeymoon trips, group tours, and customized travel experiences.",
    icon: "/icons/pacakge.png",
  },
  {
    title: "Tours",
    desc: "Professional tour solutions including Global Destination Management and FIT (Free Independent Traveler) Travel Packages designed for personalized travel experiences.",
    icon: "/icons/tours.png",
  },
  {
    title: "Booking Services",
    desc: "Complete booking assistance for Holiday Packages and Flight Booking services, ensuring a hassle-free travel planning experience.",
    icon: "/icons/booking.png",
    highlight: true,
  },
  {
    title: "Segment",
    desc: "Reliable Bus On Rent services for group tours, corporate travel, school trips, events, and customized transportation requirements.",
    icon: "/icons/segment.png",
  },
];

function Services() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>Other Services</h2>

      <div className={styles.grid}>
        {services.map((item, index) => (
          <div
            key={index}
            className={`${styles.card} ${
              item.highlight ? styles.highlightCard : ""
            }`}
          >
            <img src={item.icon} className={styles.icon} />

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <span className={styles.link}>Book Now</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;