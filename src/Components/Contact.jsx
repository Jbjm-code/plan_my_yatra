import React, { useState } from "react";
import styles from "../Styles/cont.module.css";


const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  /* ================= HANDLE INPUT ================= */
const handleChange = (e) => {

  const { name, value } = e.target;

  let errorMessage = "";

  /* ================= NAME ================= */

  if (name === "name") {

    if (!/^[A-Za-z\s]*$/.test(value)) {

      setErrors({
        ...errors,
        name: "Enter valid name"
      });

      return; // stop invalid typing
    }
  }

  /* ================= EMAIL ================= */

  if (name === "email") {

    const emailValue = value.replace(/\s/g, "");

    // More than one @
    if ((emailValue.match(/@/g) || []).length > 1) {

      setErrors({
        ...errors,
        email: "Enter valid email"
      });

      return;
    }

    // More than one consecutive dot
    if (emailValue.includes("..")) {

      setErrors({
        ...errors,
        email: "Enter valid email"
      });

      return;
    }

    // Invalid characters
    if (!/^[A-Za-z0-9@._-]*$/.test(emailValue)) {

      setErrors({
        ...errors,
        email: "Invalid email format"
      });

      return;
    }

    setErrors({
      ...errors,
      email: ""
    });

  }

  /* ================= MESSAGE ================= */

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

  /* ================= UPDATE STATE ================= */

  setFormData({
    ...formData,
    [name]: value
  });

  setErrors({
    ...errors,
    [name]: errorMessage
  });

};

  /* ================= VALIDATION ================= */

  const validateForm = () => {

    let newErrors = {};

    // NAME
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // EMAIL
    if (!formData.email.trim()) {

      newErrors.email = "Email is required";

    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {

      newErrors.email = "Invalid email format";
    }

    // MESSAGE
    if (!formData.message.trim()) {

      newErrors.message = "Message cannot be empty";

    } else if (formData.message.length > 200) {

      newErrors.message = "Maximum 200 characters allowed";
    }

    return newErrors;
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {

      setErrors(validationErrors);

    } else {

      setErrors({});

      setShowPopup(true);
    }
  };


  const resetForm = () => {

  setFormData({
    name: "",
    email: "",
    message: ""
  });

  setErrors({});
};
  /* ================= WHATSAPP ================= */

  const handleWhatsApp = () => {

  const text = encodeURIComponent(
`Name: ${formData.name}

Email: ${formData.email}

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

  /* ================= EMAIL ================= */

  const handleEmail = () => {

  const subject = encodeURIComponent(
    "Travel Inquiry"
  );

  const body = encodeURIComponent(
`Name: ${formData.name}

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

  return (

    <>
      <div className={styles.wrapper}>

        <div className={styles.contactBox}>

          {/* LEFT IMAGE */}

          <div className={styles.imageSection}>

            <img
              src="/telephone.png"
              alt="contact"
              className={styles.phoneImage}
            />

          </div>

          {/* RIGHT FORM */}

          <div className={styles.formSection}>

            <h2 className={styles.heading}>
              Need support?
            </h2>

            <p className={styles.subText}>
              Contact us if you need further assistance.
            </p>

            <form
              className={styles.form}
              onSubmit={handleSubmit}
            >

              {/* NAME */}

              <input
                type="text"
                name="name"
                placeholder="Name and surname"
                className={styles.input}
                value={formData.name}
                onChange={handleChange}
              />

              {errors.name && (
                <span className={styles.error}>
                  {errors.name}
                </span>
              )}

              {/* EMAIL */}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className={styles.input}
                value={formData.email}
                onChange={handleChange}
              />

              {errors.email && (
                <span className={styles.error}>
                  {errors.email}
                </span>
              )}

              {/* MESSAGE */}

              <textarea
                name="message"
                placeholder="Please enter the details of your request."
                className={styles.textarea}
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              {errors.message && (
                <span className={styles.error}>
                  {errors.message}
                </span>
              )}

              {/* BUTTON */}

              <button className={styles.button}>
                SUBMIT
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* ================= POPUP ================= */}

      {showPopup && (

  <div className={styles.popupOverlay}>

    <div className={styles.popupBox}>

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

    </>
  );
};

export default Contact;