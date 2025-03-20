import React from "react";
import { PieChart, Pie, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dashboard.css"; // Ensure styles are applied
import ChatBox from "./ChatBox";



const COLORS = ["#00C49F", "#FF8042", "#FFBB28"];// Custom colors for pie chart


const Dashboard = () => {

  const [myProjects, setMyProjects] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  const [tasksPercentage, setTasksPercentage] = useState([]);
  const [chat, setChat] = useState('');
  const [username, setUsername] = useState(null);

  // Get and decode token
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUsername(payload.username);
        console.log("Extracted username:", payload.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  const fetchProjects = async() => {
    if (!username) return; 

    try{
      const response = await fetch(`/api/projects/byusername/${username}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Retrieve token from storage
          "Content-Type": "application/json"
        }
      });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const projectArray = await response.json();
    console.log("projectArray: ", projectArray);
    setMyProjects(projectArray);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }}
  
  const fetchTasks = async() => {
    if (!username) return; 

    try{
      const response = await fetch(`/api/tasks/byowner/${username}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Retrieve token from storage
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

  const fetchTasksPercentage = async() => {
    if (!username) return; 

    try{
    const response = await fetch(`/api/tasks/percentagebyowner/${username}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, // Retrieve token from storage
        "Content-Type": "application/json"
      }
    });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

    const percentageArray = await response.json();
    console.log('percentageArray: ', percentageArray);

    const formattedPieData = [
      { name: "Completed Tasks", value: Number(percentageArray[0].completed_percentage) || 0, fill: "#FFBB28" },
      { name: "In-Progress Tasks", value: Number(percentageArray[0].in_progress_percentage)|| 0, fill: "#FF8042" },
      { name: "Paused Tasks", value: Number(percentageArray[0].paused_percentage) || 0, fill: "#00C49F"}
    ];

    setTasksPercentage(formattedPieData);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }}


  useEffect(() => {
    if (username) {
      fetchProjects();
      fetchTasks();
      fetchTasksPercentage();
    }
  }, [username]); 

console.log('myProjects:', myProjects);
console.log('myTasks:', myTasks);
console.log('tasksPecentage:', tasksPercentage);

  return (
    <div className="dashboard-container">
      <div className="projects-section">
        <h3>My Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{myProjects.length > 0? (
            myProjects.map((projects,index) => (
              <tr key={index}>
                <td>{projects.project_name}</td>
                <td>{projects.description}</td>
                <td>{projects.status}</td>
              </tr>
            ))
          ):(<tr>
              <td colSpan="6">No projects available</td>
             </tr>
          )}
          </tbody>
        </table>
      </div>

      <div className="chat-section">
        <h3>Project Chat</h3>
        <ChatBox chat={chat} setChat={setChat}/>
      </div>

      <div className="tasks-section">
        <h3>My Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>{myTasks.length > 0? (
            myTasks.map((tasks,index) => (
              <tr key={index}>
                <td>{tasks.subject}</td>
                <td>{tasks.description}</td>
                <td>{tasks.priority}</td>
                <td>{tasks.status}</td>
                <td>{tasks.end_date}</td>
              </tr>
            ))
          ):(<tr>
              <td colSpan="6">No tasks available</td>
             </tr>
          )}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <h3>CHARTS: Task Completion Breakdown</h3>

        {/* Pie Chart */}
        {tasksPercentage.length > 0 ? (
          <div className="chart-container">
            <h4>Task Completion Breakdown</h4>
            <PieChart width={300} height={300}>
              <Pie
                data={tasksPercentage}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {tasksPercentage.map((entry, index) => (
                  console.log('ENTRY', entry),
                  <Pie key={`cell-${index}`} fill={COLORS[index % COLORS.length]} value={entry} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

      
    
          </div>
        ) : (
          <p>Loading task data...</p>
        )}

        {/* Bar Chart */}
        {tasksPercentage.length > 0 ? (
          <div className="chart-container">
            <h4>Task Status Distribution</h4>
            <BarChart width={400} height={300} data={tasksPercentage}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        ) : (
          <p>Loading task data...</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;
