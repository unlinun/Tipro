import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { getAllTasks } from "../../../../api/task";
import { Link } from "react-router-dom";

const Task = ({ project }) => {
  const token = useSelector((state) => state.auth.token);
  const staffs = useSelector((state) => state.auth.staffs);
  const [projectTask, setProjectTask] = useState([]);

  const handleSort = (title) => {
    let newData;
    if (title === "startDate") {
      newData = [...projectTask].sort((a, b) =>
        a[title] - b[title] > 0 ? 1 : -1
      );
    } else if (title === "finished") {
      newData = [...projectTask].sort((a, b) =>
        a["finished"] - b["finished"] > 0 ? 1 : -1
      );
    }
    setProjectTask(newData);
  };

  useEffect(() => {
    const getTask = async () => {
      const data = await getAllTasks(token);
      const task = data?.tasks.filter((task) => task.projectId === project._id);
      setProjectTask(task);
    };
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="project__card card project__task">
      <Link to="/tasks" className="project__edit">
        more
      </Link>
      <div className="project__title">Tasks</div>
      <table className="contact__table table">
        <thead className="table__head">
          <tr className="table__row table__row--head">
            <th className="table__title">title</th>
            <th className="table__title">
              <div className="flex gap--8">
                startDate
                <span className="btn" onClick={() => handleSort("startDate")}>
                  ↑↓
                </span>
              </div>
            </th>
            <th className="table__title">phase</th>
            <th className="table__title">creator</th>
            <th className="table__title">
              <div className="flex gap--8">status</div>
            </th>
          </tr>
        </thead>
        <tbody className="table__body">
          {projectTask?.map((task) => {
            return (
              <tr className="table__row" key={task._id}>
                <td className="table__cell">{task.title}</td>
                <td className="table__cell">
                  {dateFormat(task?.startDate, "isoDate")}
                </td>
                <td className="table__cell">
                  <div className="cell__text">
                    {
                      task?.phase?.find((phase) => phase._id === task.phaseId)
                        .title
                    }
                  </div>
                </td>
                <td className="table__cell">
                  {
                    staffs.find((staff) => staff._id === task.createdBy)
                      .username
                  }
                </td>
                <td className="table__cell">
                  <div
                    className={
                      task.finished
                        ? "cell__tag cell__tag--checked"
                        : "cell__tag cell__tag--working"
                    }
                  >
                    {task.finished ? "finished" : "working"}
                  </div>
                </td>
              </tr>
            );
          })}
          {projectTask?.length > 0 ? (
            ""
          ) : (
            <tr style={{ justifySelf: "center" }}>
              <td>No task for this project...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Task;
