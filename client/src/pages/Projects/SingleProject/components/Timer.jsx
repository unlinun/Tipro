import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getProjectTimer } from "../../../../api/timer";

const Timer = ({ project }) => {
  const token = useSelector((state) => state.auth.token);
  const [timer, setTimer] = useState([]);

  useEffect(() => {
    const getTimer = async () => {
      const data = await getProjectTimer(project._id, token);
      setTimer(data);
    };
    getTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="project__card card project__timer">
      <div className="project__title">All staffs - phase working time</div>
      {project.phase.map((item) => {
        return (
          <div className="timer__item" key={item._id}>
            <h6>{item.title}</h6>
            <p>
              {Math.floor(
                timer?.reduce((acc, curr) => {
                  if (curr.phaseId === item._id) {
                    acc += curr.timeRecord.reduce((acc, curr) => {
                      return (acc += curr.duration);
                    }, 0);
                  }
                  return acc;
                }, 0) / 3600
              )}
              hr
              {Math.floor(
                (timer?.reduce((acc, curr) => {
                  if (curr.phaseId === item._id) {
                    acc += curr.timeRecord.reduce((acc, curr) => {
                      return (acc += curr.duration);
                    }, 0);
                  }
                  return acc;
                }, 0) %
                  3600) /
                  60
              )}
              min
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Timer;
