import React, { useState } from "react";
import { EditIcon, DeleteIcon, TickCircleIcon } from "../../../assets/icons";
import dateFormat from "dateformat";

const TaskTableRow = ({ task, index, projects }) => {
  const [isEdit, setIsEdit] = useState(false);
  const project = projects?.projects.find(
    (project) => project._id === task?.projectId
  );
  const phase = project.phase.allPhase.find(
    (phase) => phase._id === task.phaseId
  );
  return (
    <tr className="table__row" key={task?._id}>
      <td className="table__cell">{index + 1}</td>
      <td className="table__cell">{task?.title}</td>
      <td className="table__cell">{project.title}</td>
      <td className="table__cell">
        <div className="table__select select select--status">
          <select
            name="status"
            className="select__input"
            defaultValue={task?.phaseId}
          >
            <option value={task?.phaseId} disabled>
              {phase.title}
            </option>
            {project.phase.allPhase.map((phase) => (
              <option value={phase._id} key={phase._id}>
                {phase.title}
              </option>
            ))}
          </select>
        </div>
      </td>
      <td className="table__cell">{dateFormat(task?.startDate, "isoDate")}</td>

      <td className="table__cell cell cell--flex">
        {task?.tags.map((tag, i) => {
          return (
            <span className="cell__tag" key={i}>
              {tag}
            </span>
          );
        })}
      </td>
      <td className="table__cell">
        <span className="cell__tag cell__tag--checked">
          {task?.finished ? "finished" : "working"}
        </span>
      </td>
      <td className="table__cell">
        <div
          className={
            task?.finished ? "cell__check cell__check--finished" : "cell__check"
          }
        ></div>
      </td>
      <td className="table__cell">
        <div className="table__function">
          <div className="table__edit">
            {isEdit ? (
              <span
                onClick={() => setIsEdit(false)}
                className="table__icon table__icon--green"
              >
                <TickCircleIcon />
              </span>
            ) : (
              <span onClick={() => setIsEdit(true)} className="table__icon">
                <EditIcon />
              </span>
            )}
            <span className="table__icon">
              <DeleteIcon />
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;
