import React from "react";

const Timer = () => {
  return (
    <div className="timer">
      <div className="timer__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">timer</div>
            <div className="card__text card__text--sm">2022/02/05</div>
          </div>
          <div className="card__text card__text--sm">
            today's hours: 120:20:2
          </div>
        </div>
        <table className="timer__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title">task title</th>
              <th className="table__title">project</th>
              <th className="table__title">tag</th>
              <th className="table__title">counting</th>
              <th className="table__title">duration</th>
              <th className="table__title">start</th>
            </tr>
          </thead>
          <tbody className="table__body"></tbody>
        </table>
      </div>
      <div className="timer__card card"></div>
    </div>
  );
};

export default Timer;
