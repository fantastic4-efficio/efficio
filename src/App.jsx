import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import CalendarPage from "./components/CalendarPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/calendar" element={<CalendarDebug />} /> {/* ✅ Test Logging */}
      </Routes>
    </Router>
  );
};

const CalendarDebug = () => {
  console.log("Calendar Page Loaded");
  return <CalendarPage />;
};

export default App;
