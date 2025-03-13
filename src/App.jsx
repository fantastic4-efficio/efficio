import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NewTask from "./components/NewTask";
import Calendar from "./components/CalendarPage";
import Projects from "./components/MyProjects";
import Account from "./components/MyAccount";
import Login from "./components/Login";  // ✅ Ensure correct path
import Register from "./components/Register";  // ✅ Ensure correct path

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<h1>Welcome to Efficio</h1>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />  {/* ✅ Ensure this route exists */}
          <Route path="/register" element={<Register />} />  {/* ✅ Ensure this route exists */}
        </Routes>
      </Router>
  );
}

export default App;
