import "./TaskList.css";
import React, { useState } from "react";

function TaskList() {
  interface Task {
    id: number;
    name: string;
  }

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: "Math Homework" },
    { id: 2, name: "Linear Algebra Practice" },
    { id: 3, name: "get laid" },
  ]);

  const handleTaskCompleition = (
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id != taskId));
    }
  };

  const taskValue = React.useRef<HTMLInputElement>(null);
  return (
    <div className="task-list">
      <div className="task-input">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setTasks([
              ...tasks,
              { id: Date.now(), name: taskValue.current.value },
            ]);
            taskValue.current.value = "";
          }}
        >
          <input type="text" ref={taskValue} />
        </form>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              id={`checkbox-${task.id}`}
              className="form-check-input"
              onChange={(event) => handleTaskCompleition(task.id, event)}
            />
            <label className="form-check-label" htmlFor={`checkbox-${task.id}`}>
              {task.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
