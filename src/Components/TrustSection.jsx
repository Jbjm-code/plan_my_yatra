import styles from "../Styles/TrustSection.module.css";

const trustData = [
  {
    title: "Trusted Advisor",
    desc: "With over 75 years of expertise, we continue to lead with innovation and technology to create seamless holidays.",
    icon: "/icons/trust.png",
  },
  {
    title: "Responsive",
    desc: "Our holidays are designed with customer input, making each experience truly special.",
    icon: "/icons/experiences.png",
  },
  {
    title: "Memorable Experiences",
    desc: "Join the SOTC family – Over 5 million customers have created their most memorable Experiences with us",
    icon: "/icons/umbrela.png",
  },
  {
    title: "Ease",
    desc: "Choose from a vast selection of 1,000+ holidays, including unique experiences that celebrate India's cultural diversity.",
    icon: "/icons/ease.png",
  },
  {
    title: "Recognize & Connect",
    desc: "A dedicated team of 1,000+ travel experts across 160+ locations in India and NRI markets, ready to serve your travel needs.",
    icon: "/icons/connect.png",
  },
];

function TrustSection() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>
        We have served millions of guests and we are here for you
      </h2>

      <div className={styles.cardGrid}>
        {trustData.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.icon} alt="" className={styles.icon} />

            <h3>{item.title}</h3>

            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrustSection;