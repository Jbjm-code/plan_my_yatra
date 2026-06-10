import styles from "../Styles/contact.module.css";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";

function ContactSection() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
const [activeField, setActiveField] = useState("");
  const [errors, setErrors] = useState({});
const [touched, setTouched] = useState({});

const handleBlur = (e) => {
  const { name } = e.target;

  setTouched({
    ...touched,
    [name]: true
  });
};
  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newErrors = { ...errors };

    // ✅ NAME VALIDATION
    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        newErrors[name] = "Enter Valid Name";
        
        setErrors(newErrors);
        return;
      } else {
        delete newErrors[name];
      }
    }

    // ✅ EMAIL VALIDATION (typing control)
    if (name === "email") {
      if (!/^[a-zA-Z0-9@._-]*$/.test(value)) {
        newErrors.email = "Invalid character";
        setErrors(newErrors);
        return;
      } else {
        delete newErrors.email;
      }
    }

    // ✅ MESSAGE LIMIT
    if (name === "message") {
      if (value.length > 200) {
        newErrors.message = "Max 200 characters allowed";
        setErrors(newErrors);
        return;
      } else {
        delete newErrors.message;
      }
    }

    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  // ================= VALIDATE =================
  const validate = () => {
    let newErrors = {};

    // Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email
    const email = formData.email;

    if (!email) {
      newErrors.email = "Email is required";
    } else {

      // only valid chars
      if (!/^[a-zA-Z0-9@._-]+$/.test(email)) {
        newErrors.email = "Invalid character";
      }

      // only ONE @
      const atCount = (email.match(/@/g) || []).length;
      if (atCount !== 1) {
        newErrors.email = "Only one @ required";
      }

      // only ONE .
      const dotCount = (email.match(/\./g) || []).length;
      if (dotCount !== 1) {
        newErrors.email = "Only one dot (.) required";
      }

      // final format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Enter valid email (example@gmail.com)";
      }
    }

    // Message
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ================= SUBMIT =================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Submitted", formData);
    }
  };

  // ================= UI =================
  return (
    <section className={styles.wrapper}>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.overlay}></div>

        <div className={styles.heroContent}>
          <h1>Contact Us</h1>
          <h2>Adventure & Tourism</h2>
          <p>Explore the world with us</p>
        </div>
      </div>

      <div className={styles.container}>

        <h2 className={styles.sectionTitle}>Our Contact Information</h2>

        {/* ICON CARDS */}
        <div className={styles.infoCards}>
          <div className={styles.card}>
            <MapPin className={styles.icon} />
            <h4>Location</h4>
            <p>Aurangabad, Maharashtra</p>
          </div>

          <div className={styles.card}>
            <Phone className={styles.icon} />
            <h4>Phone</h4>
            <p>+91 9876543210</p>
          </div>

          <div className={styles.card}>
            <Mail className={styles.icon} />
            <h4>Email</h4>
            <p>travel@gmail.com</p>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className={styles.mainSection}>

          <div className={styles.imageBox}>
            <img src="/travel.jpg" alt="contact" />
          </div>

          <div className={styles.formBox}>
            <h3>Send us a Message</h3>

            <form onSubmit={handleSubmit}>

              <div className={styles.row}>
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                  />
                  {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                  />
                  {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                />
                {errors.email && <p className={styles.error}>{errors.email}</p>}
              </div>

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur} 
              />

              <div>
                <textarea
                  name="message"
                  placeholder="Your Message (max 200 chars)"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur} 
                ></textarea>
                {errors.message && <p className={styles.error}>{errors.message}</p>}
              </div>

              <button type="submit">Send Message</button>

            </form>
          </div>
        </div>

        {/* MAP */}
        <div className={styles.map}>
          <iframe
            src="https://maps.google.com/maps?q=Aurangabad&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;