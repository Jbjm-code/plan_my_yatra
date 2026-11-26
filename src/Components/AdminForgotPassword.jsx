import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/login.module.css";

const AdminForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

     const res = await fetch(
  "https://api.planmyyatra.com/api/Admin/send-otp",
  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email.trim()
    })
  }
);

      const data = await res.json();

      if (res.ok) {

  localStorage.setItem(
    "resetAdminId",
    data.adminId
  );

  setMessage("OTP sent successfully");

  setTimeout(() => {

    navigate("/admin-verify-otp", {
      state: {
        adminId: data.adminId
      }
    });

  }, 1000);
}

      else {

        setMessage(data.message);

      }

    }

    catch {

      setMessage("Server error");

    }

  };

  return (

    <div className={styles.authModalOverlay}>

      <div className={styles.authModal}>

        <h2 className={styles.authTitle}>
          Forgot Password
        </h2>

        {message && (

          <div className={styles.authInlineMessage}>
            {message}
          </div>

        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Enter Admin Email"
            className={styles.authInput}
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <button className={styles.authBtn}>
            Send OTP
          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminForgotPassword;