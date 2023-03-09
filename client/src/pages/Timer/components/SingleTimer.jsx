import React, { useState } from "react";
import dateFormat from "dateformat";

const SingleTimer = ({ project, index, timers }) => {
  const [selectPhase, setSelectPhase] = useState("all");
  const totalTask = timers.reduce((acc, curr) => {
    if (curr.project.title === project.title && selectPhase === "all") {
      return acc + 1;
    }
    if (
      curr.project.title === project.title &&
      curr.phase[0].title === selectPhase
    ) {
      return acc + 1;
    }
    return acc;
  }, 0);
  const totalDuration = timers.reduce((acc, curr) => {
    if (curr.project.title === project.title && selectPhase === "all") {
      return (
        acc + curr.timeRecord.reduce((acc, curr) => acc + curr.duration, 0)
      );
    }
    if (
      curr.project.title === project.title &&
      curr.phase[0].title === selectPhase
    ) {
      return (
        acc + curr.timeRecord.reduce((acc, curr) => acc + curr.duration, 0)
      );
    }
    return acc;
  }, 0);

  return (
    <tr className="table__row table__row--time" key={project._id}>
      <td className="table__cell">{index + 1}</td>
      <td className="table__cell">{project.title}</td>
      <td className="table__cell">
        {dateFormat(project.startDate, "mm/dd/yyyy")}
      </td>
      <td className="table__cell">
        <div className="table__select select select--phase">
          <select
            name="phase"
            className="select__input select__input--phase"
            defaultValue={selectPhase}
            onChange={(e) => setSelectPhase(e.target.value)}
          >
            <option value="all">all</option>
            {project?.phase?.map((phase) => {
              return (
                <option value={phase?.title} key={phase?._id}>
                  {phase?.title}
                </option>
              );
            })}
          </select>
        </div>
      </td>
      <td className="table__cell">{totalTask}</td>
      <td className="table__cell table__cell--low">
        {`${Math.ceil(totalDuration / 3600)} hr
          ${Math.ceil((totalDuration % 3600) / 60)} min`}
      </td>
    </tr>
  );
};

export default SingleTimer;
