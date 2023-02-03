import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import { getSingleProject } from "../../../api/projects";

const SingleProject = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { data: project } = useQuery("singleProject", () =>
    getSingleProject(id, token)
  );
  console.log(project);

  return (
    <div className="project">
      <div className="project__box project__info">
        <div className="project__title">{project?.title}</div>
        <div className="info">
          <div className="info__description">
            <h6>Project description</h6>
            <p>{project?.description}</p>
          </div>
          <div className="content__text">
            <h6>start date</h6>
            <p>{dateFormat(project?.startDate, "isoDate")}</p>
          </div>
          <div className="content__text">
            <h6>location</h6>
            <p>
              {project?.location.city}, {project?.location.country}
            </p>
          </div>
          <div className="content__text">
            <h6>business owner</h6>
            <p>{project?.businessOwner}</p>
          </div>
          <div className="content__text">
            <h6>status</h6>
            <div className="select">
              <select
                name="status"
                className="select__input"
                defaultValue={project?.status}
              >
                <option value="initiating">initiating</option>
                <option value="in progress">inprogress</option>
                <option value="canceled">canceled</option>
                <option value="finished">finished</option>
              </select>
            </div>
          </div>
          <div className="content__text">
            <h6>priority</h6>
            <div className="select">
              <select
                name="status"
                className="select__input"
                defaultValue={project?.priority}
              >
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="project__box project__phase phase">
        <div className="content__text">
          <h6>current phase</h6>
          <div className="select">
            <select name="phase" className="select__input">
              {project?.phase.map((phase) => {
                return (
                  <option value={phase.title} key={phase._id}>
                    {phase.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="content__text">
          <h6>phase due date</h6>
          <p>2023/06/11</p>
          <span className="box box--phase">in progress</span>
        </div>
        <div className="content__text content__text--column">
          <h6>all phase</h6>
          <div className="content__box">
            {project?.phase.map((phase, i) => {
              return (
                <span className="box" key={phase._id}>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1}-{phase.title}
                </span>
              );
            })}

            <span className="box box--add">+</span>
          </div>
        </div>
        <div className="content__text  content__text--column">
          <h6>tags</h6>
          <div className="content__box content__box--white">
            {project?.tags.map((tag, i) => {
              return (
                <span className="box box--tag" key={i}>
                  {tag}
                </span>
              );
            })}
            <span className="box box--add">+</span>
          </div>
        </div>
      </div>
      <div className="project__box project__staff">
        <div className="project__add">+</div>
        <div className="staff__manager">
          <h6>manager</h6>
          <div className="manager__info">
            <img src="" alt="" />
            <p>name</p>
          </div>
        </div>
        <div className="staff__staff">
          <h6>staff</h6>
          <div className="staff__info">
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="project__box project__contact">
        <div className="project__add">+</div>
        <div className="project__title">contact info</div>
        <table className="contact__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title">name</th>
              <th className="table__title">employer</th>
              <th className="table__title">position</th>
              <th className="table__title">phone</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr className="table__row">
              <td className="table__cell">anna</td>
              <td className="table__cell">daju</td>
              <td className="table__cell">manager</td>
              <td className="table__cell">02-2223-1111#333</td>
            </tr>
            <tr className="table__row">
              <td className="table__cell">anna</td>
              <td className="table__cell">daju</td>
              <td className="table__cell">manager</td>
              <td className="table__cell">02-2223-1111#333</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="project__box project__task">
        <div className="project__title">Tasks</div>
        <table className="contact__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title">task</th>
              <th className="table__title">start date</th>
              <th className="table__title">due date</th>
              <th className="table__title">phase</th>
              <th className="table__title">assign</th>
              <th className="table__title">status</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr className="table__row">
              <td className="table__cell">anna</td>
              <td className="table__cell">daju</td>
              <td className="table__cell">manager</td>
              <td className="table__cell">
                <div className="cell__text">04 detail</div>{" "}
              </td>
              <td className="table__cell">02-2223-1111#333</td>
              <td className="table__cell">
                <div className="cell__text">in progress</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="project__box project__timer">
        <div className="project__title">All phase working time</div>
        <div className="timer__item">
          <h6>detail design</h6>
          <p>13:00</p>
        </div>
        <div className="timer__item">
          <h6>detail design</h6>
          <p>13:00</p>
        </div>
        <div className="timer__item">
          <h6>detail design</h6>
          <p>13:00</p>
        </div>
        <div className="timer__total">
          <h6>total</h6>
          <p>120:33:02</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
