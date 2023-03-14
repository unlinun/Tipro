import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../../api/projects";
import SingleTimer from "./SingleTimer";

const TimeProject = ({ timer, timers }) => {
  const token = useSelector((state) => state.auth.token);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const data = await getAllProjects(token);
      const projects = data.projects;
      setProjects(projects);
    };
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, timers]);

  return (
    <>
      {projects.map((project, index) => (
        <SingleTimer
          project={project}
          index={index}
          timers={timers}
          key={project._id}
        />
      ))}
    </>
  );
};

export default TimeProject;
