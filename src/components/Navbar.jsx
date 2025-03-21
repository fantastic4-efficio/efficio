import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      
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
              <Link className="nav-link btn btn-outline-dark mx-2" to="/projects">New Projects</Link>
            </li>

            
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark mx-2" to="/account">My Account</Link>
            </li>

            
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark mx-2" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark mx-2" to="/register">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
