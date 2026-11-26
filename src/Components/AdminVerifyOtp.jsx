import { useState } from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import styles from "../Styles/login.module.css";

const AdminVerifyOtp = () => {

  const navigate = useNavigate();

  const location = useLocation();

const adminId =
  location.state?.adminId ||
  localStorage.getItem("resetAdminId");

  const [otp, setOtp] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleVerify = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
  "https://api.planmyyatra.com/api/Admin/verify-otp",
  {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      adminId: Number(adminId),
      otp: otp.trim()
    })
  }
);

      const data = await res.json();

      if (res.ok) {

        navigate(
          "/admin-reset-password",
          {
            state: { adminId }
          }
        );

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
          Verify OTP
        </h2>

        {message && (

          <div className={styles.authInlineMessage}>
            {message}
          </div>

        )}

        <form onSubmit={handleVerify}>

          <input
            className={styles.authInput}
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value)
            }
            required
          />

          <button className={styles.authBtn}>
            Verify OTP
          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminVerifyOtp;