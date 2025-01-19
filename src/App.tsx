import TaskBar from "./components/TaskBar";
import "./App.css";
import TaskList from "./components/TaskList";
import OffCanvas from "./components/OffCanvas";
import { ProjectProvider } from "./components/useProject";
function App() {
  return (
    <div>
      <ProjectProvider>
        <OffCanvas />
        <TaskBar />
        <TaskList />
      </ProjectProvider>
    </div>
  );
}

export default App;
