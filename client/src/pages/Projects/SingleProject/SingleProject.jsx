import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProject } from "../../../api/projects";
import NotFound from "../../Not found/NotFound";
import Contacts from "./components/Contacts";
import Info from "./components/Info";
import Phase from "./components/Phase";
import Staff from "./components/Staff";
import Task from "./components/Task";
import Timer from "./components/Timer";

const SingleProject = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { isLoading, data: project } = useQuery("singleProject", () =>
    getSingleProject(id, token)
  );

  if (isLoading) {
    return <p> is loading</p>;
  }
  // 如果 project 不存在，則顯示 not found
  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="project">
      <Info project={project} />
      <Phase project={project} />
      <Staff project={project} />
      <Contacts project={project} />
      <Task project={project} />
      <Timer project={project} />
    </div>
  );
};

export default SingleProject;
