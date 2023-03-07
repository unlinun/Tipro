import React, { useState } from "react";
import { EditIcon, DeleteIcon, TickCircleIcon } from "../../../assets/icons";
import dateFormat from "dateformat";
import { useMutation, useQueryClient } from "react-query";
import { deleteTask, updateTask } from "../../../api/task";
import { useSelector } from "react-redux";

const TaskTableRow = ({ task, index }) => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddTag, setIsAddTag] = useState(false);
  const [tags, setTags] = useState(task?.tags);
  const currentPhase = task?.phase?.find(
    (phase) => phase._id === task.phaseId
  ).title;

  // 更新 task
  const { mutate: updateTaskItem } = useMutation(
    (updateTaskItem) => {
      return updateTask(updateTaskItem, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("tasksByUser");
      },
    }
  );

  // 刪除 task
  const { mutate: deleteTaskItem } = useMutation(
    (deleteTaskItem) => {
      const isDelete = window.confirm("Delete this task?");
      if (isDelete) {
        return deleteTask(deleteTaskItem, token);
      }
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("tasksByUser");
      },
    }
  );

  // 編輯模式
  const handleEdit = () => {
    setIsAddTag(false);
    setIsEdit(false);
  };

  const handleEditTag = (e, i) => {
    const tagArray = tags;
    if (e.target.value === "") {
      tagArray.splice(i, 1);
    } else {
      tagArray[i] = e.target.value;
    }
    setTags(tagArray);
    updateTaskItem({ _id: task?._id, tags: tags });
  };

  const handleAddNewTag = (e) => {
    if (e.key !== "Enter" || e.target.value === "") return;
    setIsAddTag(false);
    const tagArray = tags;
    tagArray.push(e.target.value);
    setTags(tagArray);
    updateTaskItem({ _id: task?._id, tags: tags });
  };

  return (
    <tr className="table__row">
      <td className="table__cell">{index + 1}</td>
      {isEdit ? (
        <td className="table__cell">
          <input
            type="text"
            defaultValue={task?.title}
            onChange={(e) =>
              updateTaskItem({ _id: task?._id, title: e.target.value })
            }
          />
        </td>
      ) : (
        <td className="table__cell">{task?.title}</td>
      )}

      <td className="table__cell">{task?.project.title}</td>
      <td className="table__cell">
        <div className="table__select select select--status">
          <select
            name="status"
            className="select__input"
            defaultValue={task?.phaseId}
            onChange={(e) =>
              updateTaskItem({ _id: task?._id, phaseId: e.target.value })
            }
          >
            <option value={task?.phaseId} disabled>
              {currentPhase}
            </option>
            {task?.phase?.map((phase) => (
              <option value={phase._id} key={phase._id}>
                {phase.title}
              </option>
            ))}
          </select>
        </div>
      </td>
      {isEdit ? (
        <td className="table__cell">
          <input
            type="date"
            defaultValue={dateFormat(task?.startDate, "isoDate")}
            onChange={(e) =>
              updateTaskItem({ _id: task?._id, startDate: e.target.value })
            }
          />
        </td>
      ) : (
        <td className="table__cell">
          {dateFormat(task?.startDate, "isoDate")}
        </td>
      )}

      <td className="table__cell cell cell--flex">
        {task?.tags.map((tag, i) => {
          return isEdit ? (
            <input
              type="text"
              className="content__input"
              defaultValue={tag}
              key={i}
              onChange={(e) => handleEditTag(e, i)}
            />
          ) : (
            <span className="cell__tag" key={i}>
              {tag}
            </span>
          );
        })}
        {isEdit && !isAddTag ? (
          <span className="box box--add" onClick={() => setIsAddTag(true)}>
            +
          </span>
        ) : (
          ""
        )}
        {isEdit && isAddTag ? (
          <input
            type="text"
            className="content__input"
            onKeyDown={(e) => handleAddNewTag(e)}
          />
        ) : (
          ""
        )}
      </td>
      <td className="table__cell">
        <span
          className={
            task?.finished
              ? "cell__tag cell__tag--checked"
              : "cell__tag cell__tag--working"
          }
        >
          {task?.finished ? "finished" : "working"}
        </span>
      </td>
      <td className="table__cell">
        <div
          className={
            task?.finished ? "cell__check cell__check--checked" : "cell__check"
          }
          onClick={() =>
            updateTaskItem({
              _id: task?._id,
              finished: !task?.finished,
            })
          }
        ></div>
      </td>
      <td className="table__cell">
        <div className="table__function">
          <div className="table__edit">
            {isEdit ? (
              <span
                onClick={() => handleEdit()}
                className="table__icon table__icon--green"
              >
                <TickCircleIcon />
              </span>
            ) : (
              <span className="table__icon" onClick={() => setIsEdit(true)}>
                <EditIcon />
              </span>
            )}
            <span
              className="table__icon"
              onClick={() => deleteTaskItem({ _id: task?._id })}
            >
              <DeleteIcon />
            </span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TaskTableRow;
