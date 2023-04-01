import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getAllTasksByUser } from "../../api/task";
import TaskTableRow from "./components/TaskTableRow";

const Tasks = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [workingTask, setWorkingTask] = useState([]);
  const [finishedTask, setFinishedTask] = useState([]);

  const { isLoading, data: tasks } = useQuery("tasksByUser", () =>
    getAllTasksByUser(user._id, token)
  );

  useEffect(() => {
    setWorkingTask(tasks?.tasks.filter((task) => task.finished === false));
    setFinishedTask(tasks?.tasks.filter((task) => task.finished === true));
  }, [tasks]);

  return (
    <div className="tasks">
      <div className="tasks__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">tasks</div>
          </div>
          <div className="card__text card__text--sm">
            total tasks : {workingTask?.length}
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
            {workingTask?.length > 0 ? (
              workingTask?.map((task, i) => {
                return <TaskTableRow key={task?._id} task={task} index={i} />;
              })
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    margin: "16px",
                  }}
                >
                  working tasks is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="tasks__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">finished</div>
          </div>
          <div className="card__text card__text--sm">
            total tasks : {finishedTask?.length}
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
                    padding: "16px",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : null}
            {finishedTask?.length > 0 ? (
              finishedTask?.map((task, i) => {
                return <TaskTableRow key={task?._id} task={task} index={i} />;
              })
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "16px",
                  }}
                >
                  finished tasks is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tasks;
