import React, { useState } from "react";
import "./MyProjects.css"; // Ensure CSS file exists
import ChatBox from "./ChatBox";

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [chat, setChat] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");


  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    const newProject = { projectName, status, chat, dueDate, description };
    
    try {
      const response = await fetch('/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      });

      if (response.ok) {
        const createdProject = await response.json();
        console.log("Project Created:", createdProject);
        setProjects((prevProjects) => [...prevProjects, createdProject]);
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (projectId) => {
    if (!projectId) return;

    try {
      const response = await fetch(`/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project.id !== projectId)
        );
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:" + error);
    }
  };

  return (
    <div className="projects-container">
      {/* Project Form */}
      <div className="project-form">
        <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <input type="text" placeholder="Status (%)" value={status} onChange={(e) => setStatus(e.target.value)} />
        <input type="date" placeholder="Project Due" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <ChatBox chat={chat} setChat={setChat} />

        <div className="button-group">
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
