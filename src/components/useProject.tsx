import React, { createContext, useContext, useState } from "react";

interface Project {
  id: number;
  name: string;
  task_count: number;
}

interface ProjectContextType {
  selectedProjectInfo: Project | null;
  setSelectedProjectInfo: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedProjectInfo, setSelectedProjectInfo] =
    useState<Project | null>(null);

  return (
    <ProjectContext.Provider
      value={{ selectedProjectInfo, setSelectedProjectInfo }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
