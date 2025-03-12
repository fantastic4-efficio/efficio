import React, { useState } from "react";
 // Import styles

const TaskList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Design homepage", status: "Open" },
    { id: 2, title: "Fix login bug", status: "Ongoing" },
    { id: 3, title: "Write documentation", status: "Open" },
    { id: 4, title: "Develop API", status: "Ongoing" },
  ]);

  return (
    <div className="task-container">
      <h2>Open Tasks</h2>
      <ul className="task-list">
        {tasks.filter(task => task.status === "Open").map(task => (
          <li key={task.id} className="task-item open">
            {task.title}
          </li>
        ))}
      </ul>

      <h2>Ongoing Tasks</h2>
      <ul className="task-list">
        {tasks.filter(task => task.status === "Ongoing").map(task => (
          <li key={task.id} className="task-item ongoing">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
