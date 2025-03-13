import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import "./Dashboard.css"; // Ensure styles are applied

// Sample data for Pie and Bar Charts
const pieData = [
  { name: "Completed Tasks", value: 70 },
  { name: "Pending Tasks", value: 30 },
];

const barData = [
  { name: "Completed", tasks: 70 },
  { name: "Pending", tasks: 30 },
];

const COLORS = ["#00C49F", "#FF8042"]; // Custom colors for pie chart

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="projects-section">
        <h3>My Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Active</th>
              <th>Status</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>{/* Add project data dynamically here */}</tbody>
        </table>
      </div>

      <div className="chat-section">
        <h3>Project Chat</h3>
        {/* Chat Component Placeholder */}
      </div>

      <div className="tasks-section">
        <h3>My Open Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Project</th>
              <th>Due Date</th>
              <th>Parent Task</th>
            </tr>
          </thead>
          <tbody>{/* Add task data dynamically here */}</tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <h3>CHARTS: Completed Tasks Percentage</h3>

        {/* Pie Chart */}
        <div className="chart-container">
          <h4>Task Completion Breakdown</h4>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart */}
        <div className="chart-container">
          <h4>Task Completion Overview</h4>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tasks" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
