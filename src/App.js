import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "./store";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./screens/LandingPage";
import Chatbot from "./screens/Chatbot";
import Vendors from "./screens/Vendors";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Forgot from "./screens/Forgot";
import Feedback from "./screens/Feedback";
import Report from "./screens/Report";
import VendorSignup from "./screens/VendorSignup";
import VendorSide from "./screens/VendorSide";
import NotFound from "./screens/NotFound";
import UserOrders from "./screens/UserOrders";
import VendorOrders from "./screens/VendorOrders";
import AdminDashboard from "./screens/AdminDashboard";

function App() {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("This is a bad this", user);
  useEffect(() => {
    const storedAuthState =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("vendor")) ||
      JSON.parse(localStorage.getItem("admin"));

    if (storedAuthState) {
      dispatch(userActions.LoggedIn(storedAuthState));
    } else {
      dispatch(userActions.LoggedOut());
    }

    setLoading(false);
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
        <NavBar />
      )}
      <Routes>
        {isAuthenticated ? (
          <>
            {user.role === "user" && (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/vendors" element={<Vendors />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/report" element={<Report />} />
                <Route path="/user-orders" element={<UserOrders />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
            {user.role === "vendor" && (
              <>
                <Route path="/" element={<VendorSide />} />
                <Route path="/report" element={<Report />} />
                <Route path="/vendor-orders" element={<VendorOrders />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
            {user.role === "admin" && (
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </>
            )}
            <Route path="/" element={<Navigate to="/" />} />
            <Route path="/sign-up" element={<Navigate to="/" />} />
            <Route path="/vendor-signup" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </Routes>
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up" && (
        <Footer />
      )}
    </div>
  );
}

export default App;
