import React from "react";

const Timer = () => {
  const today = new Date();
  let week = [];
  for (let i = 1; i <= 7; i++) {
    let first = today.getDate() - today.getDay() + i;
    let day = new Date(today.setDate(first)).toISOString().slice(5, 10);
    week.push(day);
  }
  return (
    <div className="timer">
      <div className="timer__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">time sheet</div>
            <div className="card__text card__text--sm">2022/02/05</div>
          </div>
          <div className="card__text card__text--sm">week hours: 120:20:2</div>
        </div>
        <table className="timer__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title">task title</th>
              <th className="table__title">project</th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[0]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[1]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[2]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[3]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[4]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[5]}</p>
                </div>
              </th>
              <th className="table__title">
                <div className="flex flex__col">
                  <p>mon</p>
                  <p>{week[6]}</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="table__body">
            <tr className="table__row">
              <td className="table__cell">task</td>
              <td className="table__cell">task</td>
              <td className="table__cell">task</td>
              <td className="table__cell">task</td>
              <td className="table__cell">task</td>
              <td className="table__cell">task</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="timer__card card"></div>
    </div>
  );
};

export default Timer;
