import React, {
  useEffect,
  useState
} from "react";

import styles from "../Styles/adminProfile.module.css";

import {
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const AdminProfile = () => {

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [editMode,
    setEditMode] =
    useState(false);

  const [loading,
    setLoading] =
    useState(true);

  const [message,
    setMessage] =
    useState("");

  const [showPopup,
    setShowPopup] =
    useState(false);

  /* ================= ADMIN DATA ================= */

  const [adminData,
    setAdminData] =
    useState({
      id: "",
      name: "",
      email: "",
      mobile: "",
      password: ""
    });

  /* OLD DATA FOR CANCEL */

  const [oldData,
    setOldData] =
    useState({});

  /* ================= ADMIN ID ================= */

  const adminId =
    sessionStorage.getItem(
      "adminId"
    );

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    fetchAdminData();

  }, []);

  const fetchAdminData =
    async () => {

      try {

        const res = await fetch(
          `http://localhost:5048/api/Admin/${adminId}`
        );

        const data =
          await res.json();

        if (res.ok) {

          const profileData = {

            id: data.id || "",

            name:
              data.name || "",

            email:
              data.email || "",

            mobile:
              data.mobile || "",

            password: ""

          };

          setAdminData(profileData);

          setOldData(profileData);

        }

      }

      catch {

        setMessage(
          "Failed to load profile"
        );

      }

      finally {

        setLoading(false);

      }

    };

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {

    setAdminData({

      ...adminData,

      [e.target.name]:
        e.target.value

    });

  };

  /* ================= EDIT ================= */

  const handleEdit = () => {

    setEditMode(true);

  };

  /* ================= CANCEL ================= */

  const handleCancel = () => {

    setAdminData(oldData);

    setEditMode(false);

    setMessage("");

  };

  /* ================= SAVE ================= */

  const handleSave =
    async () => {

      try {

        const res = await fetch(
          `http://localhost:5048/api/Admin/update-admin/${adminId}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify(
              adminData
            )

          }
        );

        const data =
          await res.json();

        if (res.ok) {

          setMessage(
            "Profile updated successfully"
          );

          setTimeout(() => {

  setMessage("");

}, 2000);

          setOldData(adminData);

          setEditMode(false);

          setShowPopup(false);

          localStorage.setItem(
            "admin",
            JSON.stringify(
              adminData
            )
          );

        }

        else {

          setMessage(
            data.message
          );

        }

      }

      catch {

        setMessage(
          "Server error"
        );

      }

    };

  /* ================= LOADING ================= */

  if (loading) {

    return (

      <div
        className={
          styles.profileContainer
        }
      >

        <h2>
          Loading...
        </h2>

      </div>

    );

  }

  return (

    <div className={styles.profileContainer}>

      {/* ================= SIDEBAR ================= */}

      <div className={styles.sidebar}>

        <div className={styles.profileTop}>

          <div className={styles.adminIcon}>
            <FaUserShield />
          </div>

          <h2>
            {adminData.name}
          </h2>

          <p>
            Administrator
          </p>

        </div>

        <div className={styles.menu}>

          <div
            className={`${styles.menuItem}
            ${styles.active}`}
          >

            <FaUser />

            <span>
              Profile Information
            </span>

          </div>

          <div
            className={styles.menuItem}
          >

            <FaLock />

            <span>
              Reset Password
            </span>

          </div>

          <div
            className={styles.menuItem}
          >

            <FaSignOutAlt />

            <span>
              Logout
            </span>

          </div>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className={styles.content}>

        <div className={styles.headerRow}>

          <h1>
            Admin Information
          </h1>

          {!editMode ? (

            <button
              className={styles.editBtn}
              onClick={handleEdit}
            >

              <FaEdit />

              Edit

            </button>

          ) : (

            <div
              style={{
                display: "flex",
                gap: "12px"
              }}
            >

              <button
                className={styles.saveBtn}
                onClick={() =>
                  setShowPopup(true)
                }
              >

                Save

              </button>

              <button
                className={styles.resetBtn}
                onClick={handleCancel}
              >

                Cancel

              </button>

            </div>

          )}

        </div>

        {/* MESSAGE */}

        {message && (

          <div
            style={{
              marginBottom: "20px",
              color: "green",
              fontWeight: "600"
            }}
          >

            {message}

          </div>

        )}

        {/* ================= FORM ================= */}

        <div className={styles.formContainer}>

          {/* NAME */}

          <div className={styles.inputGroup}>

            <label>
              Admin Name
            </label>

            <div className={styles.inputWrapper}>

              <FaUser
                className={styles.inputIcon}
              />

              <input
                type="text"
                name="name"
                value={adminData.name}
                onChange={handleChange}
                disabled={!editMode}
              />

            </div>

          </div>

          {/* EMAIL */}

          <div className={styles.inputGroup}>

            <label>
              Email Address
            </label>

            <div className={styles.inputWrapper}>

              <FaEnvelope
                className={styles.inputIcon}
              />

              <input
                type="email"
                name="email"
                value={adminData.email}
                onChange={handleChange}
                disabled={!editMode}
              />

            </div>

          </div>

          {/* MOBILE */}

          <div className={styles.inputGroup}>

            <label>
              Mobile Number
            </label>

            <div className={styles.inputWrapper}>

              <FaPhone
                className={styles.inputIcon}
              />

              <input
                type="text"
                name="mobile"
                value={adminData.mobile}
                onChange={handleChange}
                disabled={!editMode}
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className={styles.inputGroup}>

            <label>
              Password
            </label>

            <div className={styles.inputWrapper}>

              <FaLock
                className={styles.inputIcon}
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }

                name="password"

                value={adminData.password}

                placeholder="Enter new password"

                onChange={handleChange}

                disabled={!editMode}
              />

              {editMode && (

                <div
                  className={styles.eyeIcon}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword
                    ? <FaEyeSlash />
                    : <FaEye />}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* ================= SAVE CONFIRM POPUP ================= */}

      {showPopup && (

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background:
              "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >

          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "18px",
              width: "320px",
              textAlign: "center"
            }}
          >

            <h2
              style={{
                marginBottom: "12px"
              }}
            >
              Save Changes?
            </h2>

            <p
              style={{
                marginBottom: "25px",
                color: "#666"
              }}
            >
              Are you sure you want
              to save changes?
            </p>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "center",
                gap: "14px"
              }}
            >

              <button
                onClick={() =>
                  setShowPopup(false)
                }
                className={styles.resetBtn}
              >
                No
              </button>

              <button
                onClick={handleSave}
                className={styles.saveBtn}
              >
                Yes Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default AdminProfile;