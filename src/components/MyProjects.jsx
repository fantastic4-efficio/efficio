import React, { useState } from "react";
import "./MyProjects.css"; // Ensure CSS file exists

const MyProjects = () => {
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [chat, setChat] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    console.log("Project Created:", { projectName, status, chat, dueDate, description });
  };

  const handleDelete = () => {
    setProjectName("");
    setStatus("");
    setChat("");
    setDueDate("");
    setDescription("");
    console.log("Project Deleted");
  };

  return (
    <div className="projects-container">
      {/* Project Form */}
      <div className="project-form">
        <input type="text" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
        <input type="text" placeholder="Status (%)" value={status} onChange={(e) => setStatus(e.target.value)} />
        <textarea placeholder="Chat Box" value={chat} onChange={(e) => setChat(e.target.value)}></textarea>
        <input type="date" placeholder="Project Due" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <div className="button-group">
          <button onClick={handleCreate}>Create</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MyProjects;
