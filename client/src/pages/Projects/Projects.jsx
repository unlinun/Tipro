import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllProjects } from "../../api/projects";
import ProjectTable from "./ProjectTable";

const Projects = () => {
  const token = useSelector((state) => state.auth.token);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllProjects(token);
      setProjects(data);
      console.log(data);
    };
    getData();
  }, []);
  return (
    <div className="projects">
      <div className="projects__menu menu">
        {/* filter nav*/}
        <NavLink to="/projects/initiating" className="menu__item">
          initiating
        </NavLink>
        <NavLink to="/projects/progress" className="menu__item">
          in progress
        </NavLink>
        <NavLink to="/projects/canceled" className="menu__item">
          canceled
        </NavLink>
        <NavLink to="/projects/finished" className="menu__item">
          finished
        </NavLink>
      </div>
      <ProjectTable />
    </div>
  );
};

export default Projects;
