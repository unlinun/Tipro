import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getSingleProject } from "../../../api/projects";
import Contacts from "./components/Contacts";
import Info from "./components/Info";
import Phase from "./components/Phase";

const SingleProject = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
  const { data: project } = useQuery("singleProject", () =>
    getSingleProject(id, token)
  );

  return (
    <div className="project">
      <Info project={project} />
      <Phase project={project} />
      <div className="project__card card project__staff">
        <div className="project__edit project__edit--add">+</div>
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
      <Contacts project={project} />
      <div className="project__card card project__task">
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
                <div className="cell__text">04 detail</div>
              </td>
              <td className="table__cell">02-2223-1111#333</td>
              <td className="table__cell">
                <div className="cell__text">in progress</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="project__card card project__timer">
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
