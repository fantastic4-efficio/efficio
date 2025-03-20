import { useState } from "react";
import "./NewTask.css"; // Import the CSS file

const NewTask = () => {
  const [subjectInput, setSubjectInput] = useState("");
  const [projectInput, setProjectInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("");
  const [ownerInput, setOwnerInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  const submitTask = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/tasks/create-new-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        owner: ownerInput,
        subject: subjectInput,
        description: descriptionInput,
        project_id: projectInput,
        priority: priorityInput,
        start_date: startDateInput,
        end_date: endDateInput,
        status: statusInput,
      }),
    });

    if (response.ok) {
      alert("Task submitted successfully!");
      setSubjectInput("");
      setProjectInput("");
      setStartDateInput("");
      setEndDateInput("");
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

        <label>Start Date: </label>
        <input
          className="task-input"
          type="date"
          value={startDateInput}
          onChange={(event) => setStartDateInput(event.target.value)}
        />

        <label>End Date: </label>
        <input
          className="task-input"
          type="date"
          value={endDateInput}
          onChange={(event) => setEndDateInput(event.target.value)}
        />

        <label>Description: </label>
        <input 
          ClassName="task-input"
          type="text"
          value={descriptionInput}
          onChange={(event) => setDescriptionInput(event.target.value)}
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
