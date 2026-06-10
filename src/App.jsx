import Navbar from "./Components/Navbar";
import { Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero";
import Services from "./Components/Services";
import Recommended from "./Components/Recommended";
import SeasonSection from "./Components/SeasonSection";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import TrendingDestinations from "./Components/TrendingDestinations";
import TrustSection from "./Components/TrustSection";
import RegionDestinations from "./Components/RegionDestinations";
import Testimonials from "./Components/Testimonials";
import Packages from "./Components/Packages";
import ContactSection from "./Components/ContactSection";
import PackageDetails from "./Components/PackageDetails";
import AdminForgotPassword from "./Components/AdminForgotPassword";
import AboutUs from "./Components/AboutUs";
import AdminVerifyOtp from "./Components/AdminVerifyOtp";
import AdminProfile from "./Components/AdminProfile";
import AdminResetPassword from "./Components/AdminResetPassword";


function App() {
  return (
    <>
        <Navbar />

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
             
     <Hero />
     <RegionDestinations />
     <Recommended />
    < TrendingDestinations />
     <Services />
     <SeasonSection />
     <TrustSection />
     <Contact />
     <Testimonials />
            </>
          }
        />

        {/* CONTACT PAGE */}
       <Route
  path="/state-package/:id"
  element={<Packages />}
/>
        <Route path="/contact" element={<ContactSection />} />
         <Route path="/login" element={<Login />} />
         <Route path="/about" element={<AboutUs />} />
        
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route
  path="/admin-profile"
  element={<AdminProfile />}
/>
        <Route
  path="/admin-forgot-password"
  element={<AdminForgotPassword />}
/>

<Route
  path="/admin-verify-otp"
  element={<AdminVerifyOtp />}
/>

<Route
  path="/admin-reset-password"
  element={<AdminResetPassword />}
/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;