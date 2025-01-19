import "./TaskList.css";
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TaskData from "../data/taskdata.json";
import ProjectData from "../data/projectdata.json";
import Dropdown from "react-bootstrap/Dropdown";
import { useProject } from "./useProject";

function TaskList() {
  interface Task {
    id: number;
    name: string;
    date: string;
    time: string;
    project: string;
    projectid: number;
  }
  interface Project {
    id: number;
    name: string;
    task_count: number;
  }

  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(TaskData);
  const [projects] = useState<Project[]>(ProjectData);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const { selectedProjectInfo } = useProject();

  const taskValue = useRef<HTMLInputElement>(null);
  const taskDate = useRef<HTMLInputElement>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseSave = () => {
    if (taskValue.current && taskDate.current && selectedProject) {
      const dates = new Date(taskDate.current.value);
      const formattedDate = dates.toLocaleDateString();
      const formattedTime = dates.toLocaleTimeString();

      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          name: taskValue.current.value,
          date: formattedDate,
          time: formattedTime,
          project: selectedProject.name,
          projectid: selectedProject.id,
        },
      ]);
      // console.log(taskValue.current.value);
      // taskValue.current.value = "";
      // taskDate.current.value = "";
      setSelectedProject(undefined);
      setShow(false);
    }
  };

  const handleTaskCompletion = (
    taskId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className="task-list">
      <ul className="list-group">
        {tasks.map((task) => {
          if (
            (selectedProjectInfo && selectedProjectInfo.id == task.projectid) ||
            !selectedProjectInfo
          ) {
            return (
              <li key={task.id}>
                <div className="form-check">
                  <div>
                    <input
                      type="checkbox"
                      id={`checkbox-${task.id}`}
                      className="form-check-input"
                      onChange={(event) => handleTaskCompletion(task.id, event)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${task.id}`}
                    >
                      {task.name}
                    </label>
                  </div>
                </div>
                <div className="task-details">
                  <label className="task-time">{task.time}</label>
                  <label className="task-date">{task.date}</label>
                </div>
              </li>
            );
          }
          // return (
          //   <li key={task.id}>
          //     <div className="form-check">
          //       <div>
          //         <input
          //           type="checkbox"
          //           id={`checkbox-${task.id}`}
          //           className="form-check-input"
          //           onChange={(event) => handleTaskCompletion(task.id, event)}
          //         />
          //         <label
          //           className="form-check-label"
          //           htmlFor={`checkbox-${task.id}`}
          //         >
          //           {task.name}
          //         </label>
          //       </div>
          //     </div>
          //     <div className="task-details">
          //       <label className="task-time">{task.time}</label>
          //       <label className="task-date">{task.date}</label>
          //     </div>
          //   </li>
          // );
        })}
      </ul>
      <div className="add-task">
        <Button variant="primary" onClick={handleShow}>
          Add Task
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" placeholder="Task Name" ref={taskValue} />
            <input type="datetime-local" ref={taskDate} />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedProject ? selectedProject.name : "Select Project"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {projects.map((project) => (
                  <Dropdown.Item
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleCloseSave}
              disabled={!selectedProject}
            >
              Add Task
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default TaskList;
