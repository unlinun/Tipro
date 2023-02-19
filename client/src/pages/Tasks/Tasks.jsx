import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { getAllProjects } from "../../api/projects";
import { getAllTasksByUser } from "../../api/task";
import TaskTableRow from "./components/TaskTableRow";

const Tasks = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const { isLoading, data: tasks } = useQuery("tasksByUser", () =>
    getAllTasksByUser(user._id, token)
  );
  const { data: projects } = useQuery("projects", () => getAllProjects(token));

  return (
    <div className="tasks">
      <div className="tasks__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">tasks</div>
          </div>
          <div className="card__text card__text--sm">
            total tasks : {tasks?.totalTasks}
          </div>
        </div>
        <table className="tasks__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title"></th>
              <th className="table__title">task title</th>
              <th className="table__title">project</th>
              <th className="table__title">phase</th>
              <th className="table__title">start date</th>
              <th className="table__title">tags</th>
              <th className="table__title">status</th>
              <th className="table__title">OK</th>
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
            {tasks?.tasks.map((task, i) => {
              return (
                <TaskTableRow
                  key={task?._id}
                  task={task}
                  index={i}
                  projects={projects}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
