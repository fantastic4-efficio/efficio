import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from React Router
import "./Dashboard.jsx";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Efficio</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">New Task</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">My Projects</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">Calendar</Link></li>
            <li className="nav-item"><Link className="nav-link" to="#">My Account</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
