import { useState } from "react";
import "./NewTask.css"; // Import the CSS file

const NewTask = () => {
  const [subjectInput, setSubjectInput] = useState("");
  const [projectInput, setProjectInput] = useState("");
  const [dueInput, setDueInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [statusInput, setStatusInput] = useState("");

  const submitTask = async (event) => {
    event.preventDefault();

    const response = await fetch("API ENDPOINT HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: subjectInput,
        project: projectInput,
        due_date: dueInput,
        priority: priorityInput,
        owner: ownerInput,
        status: statusInput,
      }),
    });

    if (response.ok) {
      alert("Task submitted successfully!");
      setSubjectInput("");
      setProjectInput("");
      setDueInput("");
      setPriorityInput("");
      setOwnerInput("");
      setStatusInput("");
    } else {
      alert("Failed to submit task.");
    }
  };

  return (
    <>
      <form className="task-form" onSubmit={submitTask}>
        <label>Subject: </label>
        <input
          className="task-input"
          placeholder="Subject"
          value={subjectInput}
          onChange={(event) => setSubjectInput(event.target.value)}
        />

        <label>Project: </label>
        <input
          className="task-input"
          placeholder="Project"
          value={projectInput}
          onChange={(event) => setProjectInput(event.target.value)}
        />

        <label>Due date: </label>
        <input
          className="task-input"
          type="date"
          value={dueInput}
          onChange={(event) => setDueInput(event.target.value)}
        />

        <label>Priority:</label>
        <select
          className="task-select"
          value={priorityInput}
          onChange={(event) => setPriorityInput(event.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <label>Owner: </label>
        <input
          className="task-input"
          placeholder="Owner"
          value={ownerInput}
          onChange={(event) => setOwnerInput(event.target.value)}
        />

        <label>Status:</label>
        <select
          className="task-select"
          value={statusInput}
          onChange={(event) => setStatusInput(event.target.value)}
        >
          <option value="">Select Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Paused">Paused</option>
          <option value="Completed">Completed</option>
        </select>

        <button className="task-submit">Submit</button>
      </form>
      <button className="task-cancel">Cancel</button>
    </>
  );
};

export default NewTask;
