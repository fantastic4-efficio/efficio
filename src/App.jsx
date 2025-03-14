import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NewTask from "./components/NewTask";
import Calendar from "./components/CalendarPage";
import Projects from "./components/MyProjects";
import Account from "./components/MyAccount";
import Login from "./components/Login";  
import Register from "./components/Register";  

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />  
          <Route path="/register" element={<Register />} />  
        </Routes>
      </Router>
  );
}

export default App;
