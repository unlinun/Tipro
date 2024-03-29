import React from "react";
import dateFormat from "dateformat";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../api/dashboard";
import { createMemo, updateMemo } from "../../api/memo";
import { setStaffs } from "../../state/authSlice";
import { updateTask } from "../../api/task";
import { Link } from "react-router-dom";
import { RightArrowIcon } from "../../assets/icons";

const Dashboard = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery("dashboard", () => getDashboard(token));
  if (data?.staffs) dispatch(setStaffs(data?.staffs));

  const queryClient = useQueryClient();
  const { mutate: updateTaskItem } = useMutation(
    (updateTaskItem) => {
      return updateTask(updateTaskItem, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("dashboard");
      },
    }
  );

  const handleCreateMemo = async () => {
    await createMemo({ createdAt: new Date() }, token);
    refetch();
  };

  return (
    <div className="dashboard">
      <div className="card dashboard__project">
        <div className="flex flex--bt  mg__b--20">
          <div className="card__title">{`project (in progress)`}</div>
          <Link to="/user/projects" className="btn btn--dashboard">
            more
          </Link>
        </div>
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__title"></th>
              <th className="table__title">project name</th>
              <th className="table__title"></th>
              <th className="table__title">owner</th>
              <th className="table__title">tags</th>
              <th className="table__title">phase</th>
              <th className="table__title">start date</th>
              <th className="table__title">status</th>
              <th className="table__title"></th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data?.projects?.length > 0 ? (
              data?.projects?.map((project, i) => {
                return (
                  <tr className="table__row" key={project._id}>
                    <td className="table__cell">{i + 1}</td>
                    <td className="table__cell">{project?.title}</td>
                    <td className="table__cell">
                      <div
                        className={`status status--${project?.priority}`}
                      ></div>
                    </td>
                    <td className="table__cell">{project?.businessOwner}</td>
                    <td className="table__cell cell__tag">
                      {project?.tags ? project?.tags[0] : ""}
                    </td>
                    <td className="table__cell cell__tag cell__tag--gray">
                      {project?.currentPhase}
                    </td>
                    <td className="table__cell">
                      {dateFormat(project?.startDate, "isoDate")}
                    </td>
                    <td className="table__cell cell__tag cell__tag--gray">
                      {project?.status}
                    </td>
                    <td className="table__cell">
                      <Link to={`/user/projects/${project?._id}`}>
                        <RightArrowIcon />
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    padding: "16px",
                  }}
                >{`projects is empty`}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="card dashboard__memo">
        <div className="card__title  mg__b--20">{`memo`}</div>
        {data?.memo !== null ? (
          <textarea
            cols="30"
            rows="10"
            defaultValue={data?.memo?.content}
            onChange={(e) => {
              updateMemo(
                { _id: data?.memo?._id, content: e.target.value },
                token
              );
            }}
          ></textarea>
        ) : (
          <div className="card flex flex--cen">
            <button
              className="btn btn--dashboard"
              onClick={() => handleCreateMemo()}
            >
              create memo
            </button>
          </div>
        )}
      </div>
      <div className="card dashboard__task">
        <div className="flex flex--bt mg__b--20">
          <div className="card__title">{`tasks (today)`}</div>
          <Link to="/user/tasks" className="btn btn--dashboard">
            more
          </Link>
        </div>
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th className="table__title"></th>
              <th className="table__title">task title</th>
              <th className="table__title">status</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {data?.tasks?.map((task, i) => {
              return (
                <tr className="table__row" key={task?._id}>
                  <td className="table__cell">{i + 1}</td>
                  <td
                    className={
                      task?.finished ? `table__cell--finished` : `"table__cell"`
                    }
                  >
                    {task?.title}
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
                        task?.finished
                          ? "cell__check cell__check--checked"
                          : "cell__check"
                      }
                      onClick={() =>
                        updateTaskItem({
                          _id: task?._id,
                          finished: !task?.finished,
                          endDate: !task.finished ? new Date() : "",
                        })
                      }
                    ></div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
