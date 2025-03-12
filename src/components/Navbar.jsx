import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const handleClick = () => {
    console.log("Calendar link clicked");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">Home🏠</Link>
      <ul className="navbar-nav">
        <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
        <li className="nav-item"><Link className="nav-link" to="#">New Task</Link></li>
        <li className="nav-item"><Link className="nav-link" to="#">My Projects</Link></li>
        <li className="nav-item">
          <Link className="nav-link" to="/calendar" onClick={handleClick}>Calendar</Link>
        </li> 
        <li className="nav-item"><Link className="nav-link" to="#">My Account</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
