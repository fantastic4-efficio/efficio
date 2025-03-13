import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CalendarPage from "./components/CalendarPage";
import NewTask from "./components/NewTask";
import MyAccount from "./components/MyAccount";
import MyProjects from "./components/MyProjects";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Efficio</h1>
      <p>Manage your projects efficiently.</p>
      <button className="start-button">
        <Link to="/dashboard">Let's Start Building</Link>
      </button>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/calendar" element={<CalendarPage />} /> 
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/account" element={<MyAccount />} /> 
        <Route path="/projects" element={<MyProjects />} /> {/* ✅ Profile Route */}
      </Routes>
    </Router>
  );
};


export default App;
