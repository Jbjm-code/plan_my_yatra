import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../Styles/login.module.css";

const Login = ({ closeModal }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    identifier: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");

  const [loading, setLoading] = useState(false);

  const [showWelcomePopup, setShowWelcomePopup] =
    useState(false);

  const redirectMessage = location.state?.message;

  /* ================= VALIDATE EMAIL ================= */

  const validateIdentifier = (value) => {

    value = value.replace(/\s/g, "");

    if (value.length > 40) {

      setMessageType("error");

      setMessage(
        "Email cannot exceed 40 characters"
      );

      return false;
    }

    const emailPattern =
      /^[a-zA-Z0-9._%+-]{1,40}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if ((value.match(/@/g) || []).length > 1) {

      setMessageType("error");

      setMessage(
        "Email cannot contain multiple @ symbols"
      );

      return false;
    }

    if (!emailPattern.test(value)) {

      setMessageType("error");

      setMessage(
        "Enter valid admin email"
      );

      return false;
    }

    return true;
  };

  /* ================= HANDLE INPUT ================= */

  const handleIdentifierChange = (e) => {

    let value = e.target.value;

    setMessage("");

    if (value.length > 40) {

      setMessageType("error");

      setMessage(
        "Email cannot exceed 40 characters"
      );

      return;
    }

    setForm({
      ...form,
      identifier: value
    });

    const emailPattern =
      /^[a-zA-Z0-9._%+-]{1,40}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    value = value.replace(/\s/g, "");

    if ((value.match(/@/g) || []).length > 1) {

      setMessageType("error");

      setMessage(
        "Email cannot contain multiple @ symbols"
      );
    }

    else if (
      value.length > 3 &&
      !emailPattern.test(value)
    ) {

      setMessageType("error");

      setMessage(
        "Enter valid admin email"
      );
    }

    else {

      setMessage("");
    }
  };

  /* ================= LOGIN ================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    if (!validateIdentifier(form.identifier)) {

      setMessageType("error");

      return;
    }

    try {

      setLoading(true);

     const res = await fetch(
  "https://localhost:7275/api/Admin/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            identifier: form.identifier.trim(),
            password: form.password
          })
        }
      );

      const data = await res.json();

      if (res.ok) {

        /* REMOVE USER LOGIN */

        localStorage.removeItem("userId");

        /* SAVE ADMIN */

        sessionStorage.setItem(
          "adminId",
          data.adminId
        );

        /* SAVE TOKEN */

        localStorage.setItem(
          "adminToken",
          data.token
        );

        /* SAVE ADMIN DATA */

        localStorage.setItem(
          "adminData",
          JSON.stringify(data.admin)
        );
localStorage.setItem(
  "admin",
  JSON.stringify(data.admin)
);
        window.dispatchEvent(
          new Event("adminLogin")
        );

        /* CLOSE LOGIN MODAL */

setTimeout(() => {
  closeModal();
}, 500);

/* SHOW SUCCESS POPUP */

setShowWelcomePopup(true);

        setTimeout(() => {

          const redirectPath =
            localStorage.getItem(
              "redirectAfterLogin"
            );

          if (redirectPath) {

            localStorage.removeItem(
              "redirectAfterLogin"
            );

            navigate(redirectPath);

          } else {

            navigate("/");
          }

        }, 1000);

        return;
      }

      setMessageType("error");

      setMessage(
        data.message ||
        "Invalid admin credentials"
      );

    }

    catch {

      setMessageType("error");

      setMessage(
        "Server error. Try again."
      );
    }

    finally {

      setLoading(false);
    }
  };

  return (

    <div className={styles.authModalOverlay}>

      <div className={styles.authModal}>

        {/* CLOSE BUTTON */}

        <button
          className={styles.authClose}
          onClick={closeModal}
        >
          ×
        </button>

        {/* ICON */}

        <div className={styles.authIcon}>
          🛡
        </div>

        {/* TITLE */}

        <div className={styles.authTitle}>
          Admin Login
        </div>

        <p className={styles.authSubtitle}>
          Secure Admin Access Panel
        </p>

        {/* MESSAGE */}

        {(message || redirectMessage) && (

          <div
            className={`${styles.authInlineMessage}
            ${
              messageType === "error"
                ? styles.error
                : styles.success
            }`}
          >
            {message || redirectMessage}
          </div>

        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <input
            className={styles.authInput}
            type="email"
            placeholder="Admin Email"
            maxLength={40}
            value={form.identifier}
            onChange={
              handleIdentifierChange
            }
            required
          />

          <input
            className={styles.authInput}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => {

              const value =
                e.target.value;

              if (value.length > 20)
                return;

              setForm({
                ...form,
                password: value
              });

            }}
            required
          />

          {/* FORGOT PASSWORD */}

          <div className={styles.authForgot}>

            <Link to="/admin-forgot-password">
              Forgot Password?
            </Link>

          </div>

          {/* LOGIN BUTTON */}

          <button
            className={styles.authBtn}
          >
            {
              loading
                ? "Please Wait..."
                : "LOGIN"
            }
          </button>

        </form>

      </div>

      {/* SUCCESS POPUP */}

      {showWelcomePopup && (

        <div
          className={
            styles.globalPopupOverlay
          }
        >

          <div
            className={
              styles.globalPopup
            }
          >

            {/* CLOSE BUTTON */}

            <button
              className={
                styles.popupClose
              }
              onClick={() => {

                setShowWelcomePopup(
                  false
                );

                navigate("/");

              }}
            >
              ×
            </button>

            {/* ICON */}

            <div
              className={
                styles.popupIcon
              }
            >
              ✔
            </div>

            {/* TITLE */}

            <div
              className={
                styles.popupTitle
              }
            >
              Welcome Admin
            </div>

            {/* TEXT */}

            <div
              className={
                styles.popupText
              }
            >
              Login successful
            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Login;