import { useState } from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import styles from "../Styles/login.module.css";

const AdminResetPassword = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const adminId =
    location.state?.adminId;

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleReset = async (e) => {

    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {

      setMessage(
        "Passwords do not match"
      );

      return;
    }

    try {

      const res = await fetch(
        "https://api.planmyyatra.com/api/Admin/reset-password",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            adminId,
            newPassword
          })

        }
      );

      const data = await res.json();

      if (res.ok) {

        setMessage(
          "Password reset successful"
        );

        setTimeout(() => {

          navigate("/");

        }, 1200);

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
          Reset Password
        </h2>

        {message && (

          <div className={styles.authInlineMessage}>
            {message}
          </div>

        )}

        <form onSubmit={handleReset}>

          <input
            type="password"
            placeholder="New Password"
            className={styles.authInput}
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.authInput}
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />

          <button className={styles.authBtn}>
            Reset Password
          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminResetPassword;