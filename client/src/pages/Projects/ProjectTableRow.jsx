import React from "react";
import {
  EditIcon,
  DeleteIcon,
  AddIcon,
  RightArrowIcon,
  TickCircleIcon,
} from "../../assets/icons";
import dateFormat from "dateformat";
import { updateProject, deleteProject } from "../../api/projects";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { setCreating, setForm } from "../../state/authSlice";

const ProjectTableRow = ({ project }) => {
  const startDate = dateFormat(project?.startDate, "isoDate");
  const token = useSelector((state) => state.auth.token);
  const status = useSelector((state) => state.project.status);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  // 更新 project
  const { mutate: updateProjectItem } = useMutation(
    (updateProjectItem) => {
      return updateProject(updateProjectItem, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  // 刪除 project
  const { mutate: deleteProjectItem } = useMutation(
    (deleteProjectItem) => {
      const isDelete = window.confirm("Delete this project?");
      if (isDelete) {
        return deleteProject(deleteProjectItem, token);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("projects");
      },
    }
  );

  return (
    <tr className="table__row">
      {isEdit ? (
        <td className="table__cell">
          <input
            type="text"
            defaultValue={project?.title}
            onChange={(e) =>
              updateProjectItem({ _id: project?._id, title: e.target.value })
            }
          />
        </td>
      ) : (
        <td className="table__cell">{project?.title}</td>
      )}

      <td className="table__cell table__cell--center">
        {isEdit ? (
          <div className="select select--priority">
            <select
              name="priority"
              className="select__input"
              onChange={(e) =>
                updateProjectItem({
                  _id: project?._id,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        ) : (
          <div className={`status status--${project?.priority}`}></div>
        )}
      </td>

      {isEdit ? (
        <td className="table__cell ">
          <input
            type="text"
            defaultValue={project?.businessOwner}
            onChange={(e) =>
              updateProjectItem({
                _id: project?._id,
                businessOwner: e.target.value,
              })
            }
          />
        </td>
      ) : (
        <td className="table__cell">{project?.businessOwner}</td>
      )}
      <td className="table__cell">
        <div className="table__select select select--phase">
          <select
            name="phase"
            className="select__input select__input--phase"
            defaultValue={project?.currentPhase}
            onChange={(e) => {
              updateProjectItem({
                _id: project?._id,
                currentPhase: e.target.value,
              });
            }}
          >
            <option disabled>{project?.currentPhase}</option>
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
      <td className="table__cell">
        <img
          className="table__image"
          src={`http://localhost:6001/${project.manager[0].avatar}`}
          alt="manager"
          title={project?.manager[0].username}
        />
      </td>
      <td className="table__cell">
        <div className="table__staff">
          {project?.staff.map((s) => {
            return (
              <img
                className="table__image table__image--staff"
                src={`http://localhost:6001/${s.avatar}`}
                alt={s.username}
                key={s._id}
                title={s.username}
              />
            );
          })}
        </div>
      </td>
      <td className="table__cell">{startDate}</td>
      <td className="table__cell">
        <div
          className={`table__select select select--status select--status--${(project?.status).trim()}`}
        >
          <select
            name="status"
            className={`select__input`}
            value={project?.status}
            onChange={(e) => {
              updateProjectItem({
                _id: project?._id,
                status: e.target.value,
              });
            }}
          >
            <option disabled>{project?.status}</option>
            {status.map((status, i) => {
              return (
                <option value={status} key={i}>
                  {status}
                </option>
              );
            })}
          </select>
        </div>
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
            <span
              onClick={() => {
                deleteProjectItem({ _id: project?._id });
              }}
            >
              <DeleteIcon />
            </span>
          </div>
          <div
            className="table__add"
            onClick={() => {
              dispatch(setForm({ form: "task" }));
              dispatch(setCreating());
            }}
          >
            <p>Task</p>
            <AddIcon />
          </div>
          <Link to={`/projects/${project?._id}`}>
            <RightArrowIcon />
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default ProjectTableRow;
