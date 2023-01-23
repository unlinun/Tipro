import React from "react";
import { LeftArrowIcon, RightArrowIcon } from "../../assets/icons";
import ProjectTable from "./ProjectTable";
const Projects = () => {
  return (
    <div className="projects">
      <div className="projects__menu menu">
        <div className="menu__item active">in progress</div>
        <div className="menu__item">in progress</div>
        <div className="menu__item">in progress</div>
        <div className="menu__item">in progress</div>
      </div>
      <table className="projects__table table">
        <thead className="table__head">
          <tr className="table__row table__row--head">
            <th className="table__title">project name</th>
            <th className="table__title"></th>
            <th className="table__title">owner</th>
            <th className="table__title">phase</th>
            <th className="table__title">PM</th>
            <th className="table__title">staff</th>
            <th className="table__title">start date</th>
            <th className="table__title">status</th>
            <th className="table__title"></th>
            <th className="table__title"></th>
          </tr>
        </thead>
        <tbody className="table__body">
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
          <ProjectTable />
        </tbody>
      </table>
      <div className="projects__pagination">
        <LeftArrowIcon />
        <span className="pagination">1/10</span>
        <RightArrowIcon />
      </div>
    </div>
  );
};

export default Projects;
