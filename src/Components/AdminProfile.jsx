import React, {
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/adminProfile.module.css";
import navbarStyles from "../Styles/navbar.module.css";

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

  const navigate = useNavigate();
  
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
    const [errors, setErrors] = useState({
  name: "",
  email: "",
  mobile: ""
});

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

    console.log("Admin ID =", adminId);

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    fetchAdminData();

  }, []);

  const fetchAdminData = async () => {

  console.log("fetchAdminData called");

      try {

       console.log("Fetching Admin:", adminId);

const res = await fetch(
  `https://api.planmyyatra.com/api/Admin/${adminId}`
);

console.log("Status:", res.status);

const data = await res.json();

console.log("Response:", data);

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

  const { name, value } = e.target;

  setAdminData({
    ...adminData,
    [name]: value
  });

  setErrors({
    ...errors,
    [name]: ""
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

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
const [showLogoutSuccess, setShowLogoutSuccess] = useState(false);

const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminData");
  localStorage.removeItem("admin");

  sessionStorage.removeItem("adminId");

  setShowLogoutPopup(false);
  setShowLogoutSuccess(true);

  setTimeout(() => {
    setShowLogoutSuccess(false);
   window.location.href = "/";
  }, 6000);
};

  /* ================= SAVE ================= */

  const handleSave =
    async () => {
const newErrors = {};

if (!adminData.name.trim()) {
  newErrors.name = "Name can't be blank";
}

if (!adminData.email.trim()) {
  newErrors.email = "Email can't be blank";
}

if (!adminData.mobile.trim()) {
  newErrors.mobile = "Mobile can't be blank";
}

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors);
  return;
}
      try {

        const res = await fetch(
          `https://api.planmyyatra.com/api/Admin/update-admin/${adminId}`,
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
  onClick={() =>
    navigate("/admin-forgot-password")
  }
>
  <FaLock />
  <span>Reset Password</span>
</div>

       <div
  className={styles.menuItem}
  onClick={() => setShowLogoutPopup(true)}
>
  <FaSignOutAlt />
  <span>Logout</span>
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
  placeholder="Enter Name"
  value={adminData.name}
  onChange={handleChange}
  disabled={!editMode}
/>
{errors.name && (
  <p className={styles.errorText}>
    {errors.name}
  </p>
)}

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
                placeholder="Enter Email"
                value={adminData.email}
                onChange={handleChange}
                disabled={!editMode}
              />
              {errors.email && (
  <p className={styles.errorText}>
    {errors.email}
  </p>
)}

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
                placeholder="Enter Mobile Number"
                value={adminData.mobile}
                onChange={handleChange}
                disabled={!editMode}
              />

{errors.mobile && (
  <p className={styles.errorText}>
    {errors.mobile}
  </p>
)}
            </div>

          </div>

          {/* PASSWORD */}

          

           

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

      {/* LOGOUT CONFIRM POPUP */}

{showLogoutPopup && (

  <div className={navbarStyles.logoutOverlay}>

    <div className={navbarStyles.logoutPopup}>

      <h3>Confirm Logout</h3>

      <p>
        Are you sure you want to logout?
      </p>

      <div className={navbarStyles.logoutActions}>

        <button
          className={navbarStyles.cancelBtn}
          onClick={() => setShowLogoutPopup(false)}
        >
          Cancel
        </button>

        <button
          className={navbarStyles.confirmLogoutBtn}
          onClick={handleLogout}
        >
          Yes Logout
        </button>

      </div>

    </div>

  </div>

)}

{/* LOGOUT SUCCESS */}

{showLogoutSuccess && (

  <div className={navbarStyles.successOverlay}>

    <div className={navbarStyles.successPopup}>

      <div className={navbarStyles.successIcon}>
        ✔
      </div>

      <h3>
        Logout Successful
      </h3>

    </div>

  </div>

)}

    </div>

  );

};

export default AdminProfile;