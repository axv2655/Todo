import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./OffCanvas.css";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import hamburger from "../assets/hamburger.svg";
import ProjectData from "../data/projectdata.json";
import { useProject } from "./useProject";

interface Project {
  id: number;
  name: string;
  task_count: number;
}

function OffCanvas() {
  const [projects, setProjects] = useState<Project[]>(ProjectData);

  const [showCanvas, setShowCanvas] = useState(false);
  const handleCloseCanvas = () => setShowCanvas(false);
  const handleShowCanvas = () => setShowCanvas(true);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseSave = () => {
    if (!taskValue.current || taskValue.current.value.trim() === "") {
      alert("Project name cannot be empty!");
      return;
    }

    setProjects((prevProjects) => [
      ...prevProjects,
      {
        id: Date.now(),
        name: taskValue.current.value.trim(),
        task_count: 0,
      },
    ]);

    taskValue.current.value = "";
    setShowModal(false);
  };

  const taskValue = useRef<HTMLInputElement>(null);
  const { setSelectedProjectInfo } = useProject();

  return (
    <>
      <div className="project-button">
        <Button variant="primary" onClick={handleShowCanvas}>
          <Image
            src={hamburger}
            thumbnail
            style={{ background: "none", border: "none" }}
          />
        </Button>
      </div>
      <Offcanvas show={showCanvas} onHide={handleCloseCanvas}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Projects</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <Button
                variant="light"
                onClick={() => setSelectedProjectInfo(project)}
              >
                {project.name}
              </Button>
            </div>
          ))}
        </Offcanvas.Body>
        <div>
          <Button variant="primary" onClick={handleShowModal}>
            Add Project
          </Button>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Add Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" placeholder="Project Name" ref={taskValue} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleCloseSave}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Offcanvas>
    </>
  );
}

export default OffCanvas;
