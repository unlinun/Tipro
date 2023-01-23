import React from "react";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  RightArrowIcon,
} from "../../assets/icons";

const ProjectTable = () => {
  return (
    <tr className="table__row">
      <td className="table__cell table__cell--name">
        Hanzong landscape project design
      </td>
      <td className="table__cell table__cell--center">
        <div className="status status--low"></div>
      </td>
      <td className="table__cell">Daju architecture</td>
      <td className="table__cell">
        <div className="table__select select select--phase">
          <select name="phase" className="select__input">
            <option value="">jkjk;</option>
            <option value="">jj;</option>
          </select>
        </div>
      </td>
      <td className="table__cell">
        <img className="table__image" src="" alt="" />
      </td>
      <td className="table__cell">
        <div className="table__staff">
          <div className="table__image table__image--staff">+3</div>
          <img className="table__image table__image--staff" src="" alt="" />
          <img className="table__image table__image--staff" src="" alt="" />
          <img className="table__image table__image--staff" src="" alt="" />
        </div>
      </td>
      <td className="table__cell">2022/03/05</td>
      <td className="table__cell">
        <div className="table__select select select--status">
          <select name="status" className="select__input">
            <option value="">jkjk;</option>
            <option value="">jj;</option>
          </select>
        </div>
      </td>
      <td className="table__cell">
        <div className="table__function">
          <EditIcon />
          <DeleteIcon />
          <div className="table__add">
            <p>Task</p>
            <AddIcon />
          </div>
          <RightArrowIcon />
        </div>
      </td>
    </tr>
  );
};

export default ProjectTable;
