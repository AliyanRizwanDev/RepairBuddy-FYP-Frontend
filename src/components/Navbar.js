import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { userActions } from '../store';
import "../styles/components/Navbar.css";
import logo from "../logo.png";
import { toast } from "react-toastify";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(userActions.LoggedOut());
    localStorage.removeItem("user");
    localStorage.removeItem("vendor");
    localStorage.removeItem("admin");
    toast.success("Logged Out");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" id="resbutton"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 my-1 ">
            {user.role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/chatbot">
                    Chatbot
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/vendors">
                    Vendors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-light" to="/feedback">
                    Feedback
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user.role ? (
            <button className="btn btn-outline-primary my-1" id="button" onClick={handleLogout} style={{ width: "fit-content" }}>
              Log Out
            </button>
          ) : (
            <>
              <Link to="/sign-in">
                <button className="btn btn-outline-primary my-1" id="button">
                  Sign In
                </button>
              </Link>
              <Link to="/vendor-signup">
                <button style={{ width: "fit-content" }} className="btn btn-outline-primary mx-2" id="button">
                  Sign Up as Vendor
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
