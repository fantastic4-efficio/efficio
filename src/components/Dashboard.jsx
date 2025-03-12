import React from "react";
import TaskList from "./tasklist"; // Import the Open Tasks section
import "./Dashboard.css"; // Optional: Create a Dashboard CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <TaskList /> {/* Open Tasks Component */}
      </div>
    </div>
  );
};

export default Dashboard;
