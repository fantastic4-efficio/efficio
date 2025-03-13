import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Ensures Bootstrap styles are loaded
import "./Navbar.css"; // ✅ Custom styling

const Navbar = () => {
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
            <Link className="nav-link btn btn-outline-dark mx-2" to="/account">My Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-outline-dark mx-2" to="/projects">My Projects</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;