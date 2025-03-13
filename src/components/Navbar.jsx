import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";

const Navbar = () => {
  const auth = useContext(AuthContext); // ✅ Ensure useContext is used correctly

  if (!auth) {
    return <nav>Loading...</nav>; // ✅ Prevents error if context is undefined
  }

  const { user, logout } = auth;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/">Home 🏡</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/new-task">New Task</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/calendar">Calendar</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/projects">My Projects</Link>
          </li>

          {/* ✅ Show Account for Logged-in Users */}
          {user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-dark mx-2" to="/account">My Account</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-outline-danger mx-2" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-dark mx-2" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-dark mx-2" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
