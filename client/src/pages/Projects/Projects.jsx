import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import TaskFrom from "../../components/TaskFrom";

import ProjectTable from "./ProjectTable";

const Projects = () => {
  // get filter item
  const [projectsFilter, setProjectsFilter] = useState("all");
  const form = useSelector((state) => state.auth.form);
  const isCreating = useSelector((state) => state.auth.creating);

  // 點擊按鈕時改變 filter item
  const handleProjectsFilter = (filter) => {
    setProjectsFilter(filter);
  };

  return (
    <div className="projects">
      {isCreating && form === "task" ? <TaskFrom /> : ""}
      <div className="projects__menu menu">
        {/* filter nav*/}
        <div
          className={`menu__item ${projectsFilter === "all" ? "active" : ""}`}
          onClick={() => handleProjectsFilter("all")}
        >
          all
        </div>
        <div
          className={`menu__item ${
            projectsFilter === "initiating" ? "active" : ""
          }`}
          onClick={() => handleProjectsFilter("initiating")}
        >
          initiating
        </div>
        <div
          className={`menu__item ${
            projectsFilter === "in progress" ? "active" : ""
          }`}
          onClick={() => handleProjectsFilter("in progress")}
        >
          in progress
        </div>
        <div
          className={`menu__item ${
            projectsFilter === "canceled" ? "active" : ""
          }`}
          onClick={() => handleProjectsFilter("canceled")}
        >
          canceled
        </div>
        <div
          className={`menu__item ${
            projectsFilter === "finished" ? "active" : ""
          }`}
          onClick={() => handleProjectsFilter("finished")}
        >
          finished
        </div>
      </div>
      {}
      <ProjectTable projectsFilter={projectsFilter} />
    </div>
  );
};

export default Projects;
