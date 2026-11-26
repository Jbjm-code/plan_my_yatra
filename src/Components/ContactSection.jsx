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
  const [showPopup, setShowPopup] = useState(false);
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

  let errorMessage = "";

  // FIRST NAME & LAST NAME
  if (name === "firstName" || name === "lastName") {

    if (!/^[A-Za-z\s]*$/.test(value)) {

      setErrors({
        ...errors,
        [name]: "Enter valid name"
      });

      return;
    }
  }

  // EMAIL
  if (name === "email") {

    const emailValue = value.replace(/\s/g, "");

    if ((emailValue.match(/@/g) || []).length > 1) {

      setErrors({
        ...errors,
        email: "Only one @ allowed"
      });

      return;
    }

    if (emailValue.includes("..")) {

      setErrors({
        ...errors,
        email: "Enter valid email"
      });

      return;
    }

    if (!/^[A-Za-z0-9@._-]*$/.test(emailValue)) {

      setErrors({
        ...errors,
        email: "Invalid email"
      });

      return;
    }
  }

  // MESSAGE
  if (name === "message") {

    if (value.length > 200) {

      setErrors({
        ...errors,
        message: "Maximum 200 characters allowed"
      });

      return;
    }

    if (value.length >= 200) {
      errorMessage = "Maximum 200 characters reached";
    }
  }

  setFormData({
    ...formData,
    [name]: value
  });

  setErrors({
    ...errors,
    [name]: errorMessage
  });
};


// ================= VALIDATE =================

const validate = () => {

  let newErrors = {};

  // First Name
  if (!formData.firstName.trim()) {

    newErrors.firstName = "First name is required";

  } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {

    newErrors.firstName = "Enter valid first name";
  }

  // Last Name
  if (!formData.lastName.trim()) {

    newErrors.lastName = "Last name is required";

  } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {

    newErrors.lastName = "Enter valid last name";
  }

  // Email
  if (!formData.email.trim()) {

    newErrors.email = "Email is required";

  } else if (
    !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/.test(
      formData.email
    )
  ) {

    newErrors.email = "Enter valid email";
  }

  // Subject
  if (!formData.subject.trim()) {

    newErrors.subject = "Subject is required";
  }

  // Message
  if (!formData.message.trim()) {

    newErrors.message = "Message is required";

  } else if (formData.message.length > 200) {

    newErrors.message =
      "Maximum 200 characters allowed";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const resetForm = () => {

  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  setErrors({});
};

const handleWhatsApp = () => {

  const text = encodeURIComponent(
`Name: ${formData.firstName} ${formData.lastName}

Email: ${formData.email}

Subject: ${formData.subject}

Message:
${formData.message}`
  );

  window.open(
    `https://wa.me/919067777990?text=${text}`,
    "_blank"
  );

  resetForm();
  setShowPopup(false);
};

const handleEmail = () => {

  const subject = encodeURIComponent(
    formData.subject
  );

  const body = encodeURIComponent(
`Name: ${formData.firstName} ${formData.lastName}

Email: ${formData.email}

Message:
${formData.message}`
  );

  const isMobile =
    /Android|iPhone|iPad|iPod/i.test(
      navigator.userAgent
    );

  if (isMobile) {

    window.location.href =
      `mailto:planmyyatraa@gmail.com?subject=${subject}&body=${body}`;

  } else {

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=planmyyatraa@gmail.com&su=${subject}&body=${body}`,
      "_blank"
    );

  }

  resetForm();
  setShowPopup(false);
};

  // ================= SUBMIT =================
const handleSubmit = (e) => {

  e.preventDefault();

  if (validate()) {

    setShowPopup(true);

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
            <p>Karve Road, Pune</p>
          </div>

          <div className={styles.card}>
            <Phone className={styles.icon} />
            <h4>Phone</h4>
            <p>+91 9067777990</p>
          </div>

          <div className={styles.card}>
            <Mail className={styles.icon} />
            <h4>Email</h4>
            <p>planmyyatraa@gmail.com</p>
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
              {errors.subject && (
  <p className={styles.error}>
    {errors.subject}
  </p>
)}

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
            src="https://www.google.com/maps?q=Karve+Road,+Pune,+Maharashtra&output=embed"
            loading="lazy"
          ></iframe>
        </div>

      </div>

      {showPopup && (

<div className={styles.popupOverlay}>

  <div className={styles.popupBox}>

    <div className={styles.popupIcon}>
      ✔
    </div>

    <h3>Contact Options</h3>

    <p>
      Choose where you want to send message
    </p>

    <div className={styles.popupButtons}>

      <button
        className={styles.whatsappBtn}
        onClick={handleWhatsApp}
      >
        WhatsApp
      </button>

      <button
        className={styles.emailBtn}
        onClick={handleEmail}
      >
        Email
      </button>

      <button
        className={styles.cancelBtn}
        onClick={() => setShowPopup(false)}
      >
        Cancel
      </button>

    </div>

  </div>

</div>

)}
    </section>
  );
}

export default ContactSection;