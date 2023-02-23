import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllProjects } from "../../api/projects";
import ProjectTableRow from "./ProjectTableRow";

const ProjectTable = ({ projectsFilter, setForm }) => {
  // 取得 token
  const token = useSelector((state) => state.auth.token);
  // 使用 useQuery 取得所有 projects
  const { isLoading, data } = useQuery("projects", () => getAllProjects(token));
  // 根據 projectsFilter 來取得對應的 project
  const filterProjects = data?.projects?.filter((project) => {
    if (projectsFilter !== "all") {
      return project.status === projectsFilter;
    }
    return project;
  });

  return (
    <>
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
          {isLoading ? (
            <tr style={{ textAlign: "center", justifySelf: "center" }}>
              <td
                style={{
                  textAlign: "center",
                  margin: "12px",
                }}
              >
                Loading...
              </td>
            </tr>
          ) : null}
          {filterProjects?.length > 0 ? (
            filterProjects.map((project) => {
              return <ProjectTableRow key={project._id} project={project} />;
            })
          ) : (
            <tr style={{ textAlign: "center", justifySelf: "center" }}>
              <td
                style={{
                  textAlign: "center",
                  margin: "12px",
                }}
              >{`${projectsFilter} projects is empty`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ProjectTable;
