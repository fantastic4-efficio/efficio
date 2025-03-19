import React from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  // const {username} = useParams();
  const username = "johndoe";
  const [myTasks, setMyTasks] = useState([]);
  const [tasksPecentage, setTasksPercentage] = useState([]);

useEffect(() => {
  const fetchTasks = async() => {
    try{
      const response = await fetch(`http://localhost:3000/api/tasks/byowner/${username}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve token from storage
          "Content-Type": "application/json"
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const taskArray = await response.json();
    console.log("taskArray: ", taskArray);
    setMyTasks(taskArray);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }}

  fetchTasks();
}, []);

console.log('myTasks:', myTasks);

useEffect(() => {
    const fetchTasksPercentage = async() => {
      try{
      const response = await fetch(`http://localhost:3000/api/tasks/percentagebyowner/${username}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Retrieve token from storage
          "Content-Type": "application/json"
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

      const percentageArray = await response.json();
      console.log('percentageArray: ', percentageArray);
      setTasksPercentage(percentageArray);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }}

  fetchTasksPercentage();
}, []);

console.log('tasksPecentage:', tasksPecentage);

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
