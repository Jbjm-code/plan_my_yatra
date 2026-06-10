import styles from "../Styles/navbar.module.css";
import { Link } from "react-router-dom";
import {
  useState,
  useEffect,
  useRef
} from "react";
import { Menu, X } from "lucide-react";
import Login from "../Components/Login";
import { User } from "lucide-react";

function Navbar() {
  const [showLogin, setShowLogin] =
  useState(false);

const [mobileMenu, setMobileMenu] =
  useState(false);

const [isAdminLoggedIn,
  setIsAdminLoggedIn] =
  useState(false);

const [showAdminMenu,
  setShowAdminMenu] =
  useState(false);

const [showLogoutPopup,
  setShowLogoutPopup] =
  useState(false);

const [showLogoutSuccess,
  setShowLogoutSuccess] =
  useState(false);
const dropdownRef = useRef();

useEffect(() => {

  const handleClickOutside = (event) => {

    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target
      )
    ) {

      setShowAdminMenu(false);

    }

  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {

    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

  };

}, []);


  useEffect(() => {

  const token =
    localStorage.getItem(
      "adminToken"
    );

  setIsAdminLoggedIn(!!token);

  const handleAdminLogin = () => {

    setIsAdminLoggedIn(true);

  };

  window.addEventListener(
    "adminLogin",
    handleAdminLogin
  );

  return () => {

    window.removeEventListener(
      "adminLogin",
      handleAdminLogin
    );

  };

}, []);


  return (
    <>
      {/* ================= NAVBAR ================= */}

      <div className={styles.topStrip}>

        {/* ===== MOBILE LEFT HAMBURGER ===== */}
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
  <X size={24} color="#000" />
) : (
  <Menu size={24} color="#000" />
)}
        </button>

        {/* ===== LEFT SECTION ===== */}
        <div className={styles.leftContact}>

          {/* LOGO */}
          <div className={styles.logoSection}>
  <Link to="/" className={styles.logoWrapper}>
    <img
      src="/logo.png"
      alt="logo"
      className={styles.logo}
    />

    <span className={styles.logoText}>
      Plan My Yatraa
    </span>
  </Link>
</div>

          {/* CALL BOX */}
          <div className={styles.countryBox}>
            <img src="/icons/call.png" alt="call" />
            <span>+91 9876543210</span>
          </div>

        </div>

        {/* ===== DESKTOP LINKS ===== */}
        <div className={styles.rightLinks}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/about" className={styles.link}>About us</Link>
          <Link to="/contact" className={styles.link}>Contact</Link>
{isAdminLoggedIn ? (

<div
  className={styles.adminWrapper}
  ref={dropdownRef}
>

    <button
      className={styles.adminIconBtn}
      onClick={() =>
        setShowAdminMenu(
          !showAdminMenu
        )
      }
    >
      <User size={22} />
    </button>

    {showAdminMenu && (

      <div className={styles.adminDropdown}>

        <div className={styles.adminInfo}>

          <h4>Admin</h4>

          <p>admin@gmail.com</p>

        </div>

        <Link
  to="/admin-profile"
  className={styles.dropdownItem}
  onClick={() =>
    setShowAdminMenu(false)
  }
>
          Admin Information
        </Link>

        <Link
          to="/admin-reset-password"
          className={styles.dropdownItem}
           onClick={() =>
    setShowAdminMenu(false)
  }
        >
          Reset Password
        </Link>

        <button
          className={styles.logoutBtn}
          onClick={() => {

            setShowAdminMenu(false);

            setShowLogoutPopup(true);

          }}
        >
          Logout
        </button>

      </div>

    )}

  </div>

) : (

  <button
    className={styles.loginBtn}
    onClick={() =>
      setShowLogin(true)
    }
  >
    Login
  </button>

)}
         
        </div>

       {/* ===== MOBILE LOGIN BUTTON ===== */}
{/* ===== MOBILE RIGHT BUTTON ===== */}

{isAdminLoggedIn ? (

  <div className={styles.mobileAdminWrapper}>

    <button
      className={styles.mobileAdminBtn}
      onClick={() =>
        setShowAdminMenu(
          !showAdminMenu
        )
      }
    >
      <User size={20} />
    </button>

    {showAdminMenu && (

      <div className={styles.adminDropdown}>

        <div className={styles.adminInfo}>

          <h4>Admin</h4>

          <p>admin@gmail.com</p>

        </div>

        <Link
          to="/admin-profile"
          className={styles.dropdownItem}
        >
          Admin Information
        </Link>

        <Link
          to="/admin-reset-password"
          className={styles.dropdownItem}
        >
          Reset Password
        </Link>

        <button
          className={styles.logoutBtn}
          onClick={() => {

            setShowAdminMenu(false);

            setShowLogoutPopup(true);

          }}
        >
          Logout
        </button>

      </div>

    )}

  </div>

) : (

  <button
    className={styles.mobileLoginBtn}
    onClick={() =>
      setShowLogin(true)
    }
  >
    Login
  </button>

)}
      </div>

      {/* ================= MOBILE MENU ================= */}

      <div
        className={`${styles.mobileMenuWrapper} ${
          mobileMenu ? styles.showMenu : ""
        }`}
      >
        <Link
          to="/"
          className={styles.mobileLink}
          onClick={() => setMobileMenu(false)}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={styles.mobileLink}
          onClick={() => setMobileMenu(false)}
        >
          About us
        </Link>

        <Link
          to="/contact"
          className={styles.mobileLink}
          onClick={() => setMobileMenu(false)}
        >
          Contact
        </Link>

        
      </div>

      {/* ================= LOGIN POPUP ================= */}

      {/* ================= LOGIN POPUP ================= */}

{showLogin && (

  <div
    onClick={() => setShowLogin(false)}
  >

    <div
      onClick={(e) => e.stopPropagation()}
    >
      <Login closeModal={() => setShowLogin(false)} />
    </div>

  </div>

)}

{/* LOGOUT CONFIRM POPUP */}

{showLogoutPopup && (

  <div className={styles.logoutOverlay}>

    <div className={styles.logoutPopup}>

      <h3>
        Confirm Logout
      </h3>

      <p>
        Are you sure you want
        to logout?
      </p>

      <div className={styles.logoutActions}>

        <button
          className={styles.cancelBtn}
          onClick={() =>
            setShowLogoutPopup(false)
          }
        >
          Cancel
        </button>

        <button
          className={styles.confirmLogoutBtn}
          onClick={() => {

            localStorage.removeItem(
              "adminToken"
            );

            localStorage.removeItem(
              "adminData"
            );

            localStorage.removeItem(
  "admin"
);

            sessionStorage.removeItem(
              "adminId"
            );
            

            setShowLogoutPopup(false);

            setShowLogoutSuccess(true);

            setIsAdminLoggedIn(false);

            setTimeout(() => {

              setShowLogoutSuccess(
                false
              );

              window.location.href = "/";

            }, 2000);

          }}
        >
          Yes Logout
        </button>

      </div>

    </div>

  </div>

)}

{/* LOGOUT SUCCESS */}

{showLogoutSuccess && (

  <div className={styles.successOverlay}>

    <div className={styles.successPopup}>

      <div className={styles.successIcon}>
        ✔
      </div>

      <h3>
        Logout Successful
      </h3>

    </div>

  </div>

)}
    </>
  );
}

export default Navbar;