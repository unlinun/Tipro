import React, { useEffect, useState } from "react";
import { QueryClient, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getTimer } from "../../api/timer";
import TimerTableRow from "./components/TimerTableRow";
import dateFormat from "dateformat";
const Timer = () => {
  const token = useSelector((state) => state.auth.token);
  const [today, setToday] = useState(new Date());
  // 依據本週時間取得 timer
  let weekDate = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = today.getDay();
  const day = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const weekStartDate = new Date(today.setDate(day)); // sets the hours of the Date object to the specified value, but in the UTC timezone.
  weekStartDate.setUTCHours(0, 0, 0, 0);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);
  // 在 mongoBD中，是iso string
  const weekStartIsoDate = weekStartDate.toISOString();
  // 找到一週的時間並且顯示在 js 中
  const weekDates = [...Array(7)].map((_, i) => ({
    day: weekDate[new Date(today.setDate(day + i)).getDay()],
    date: new Date(today.setDate(day + i)).toISOString(),
  }));

  // 使用 useQuery 取得 timer data
  const queryClient = new QueryClient();
  const { data: timers } = useQuery("timer", () =>
    getTimer(weekStartIsoDate, token)
  );
  console.log(timers);

  useEffect(() => {
    // Call getTimer API whenever the week start date changes
    const newTimers = getTimer(weekStartIsoDate, token);
    // Update the timers data in the cache using the setQueryData method
    queryClient.setQueryData("timer", newTimers);
  }, [today, token]);

  return (
    <div className="timer">
      <div className="timer__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card--flex">
            <div className="card__title">time sheet</div>
            <input
              className="content__input"
              type="date"
              max={dateFormat(new Date(), "yyyy-mm-dd")}
              defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
              onChange={(e) => setToday(new Date(e.target.value))}
            />
          </div>
          <div className="card__text card__text--sm">
            {`${weekStartDate.toISOString().slice(0, 10)} - ${weekEndDate
              .toISOString()
              .slice(0, 10)}`}
          </div>
        </div>
        <table className="timer__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title"></th>

              <th className="table__title">project</th>
              <th className="table__title">task title</th>
              {weekDates?.map((date, i) => {
                return (
                  <th className="table__title" key={i}>
                    <div className="flex flex__col">
                      <p>{date.day}</p>
                      <p>{date.date.slice(5, 10)} th</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">
            {timers?.length > 0 ? (
              timers?.map((timer, index) => {
                return (
                  <TimerTableRow
                    key={timer._id}
                    timer={timer}
                    index={index}
                    weekStartIsoDate={weekStartIsoDate}
                  />
                );
              })
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    margin: "16px",
                  }}
                >
                  no task to generate time sheet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="timer__card card">
        <div className="card--flex card--flex--between mg__b--20">
          <div className="card__title">Timer overview</div>
        </div>
        <table className="timer__table">
          <thead className="table__head">
            <tr className="table__row table__row--time table__row--head">
              <th className="table__title">project</th>
              <th className="table__title">start Date</th>
              <th className="table__title">phase</th>
              <th className="table__title">total task</th>
              <th className="table__title">duration</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {timers?.length > 0 ? (
              timers?.map((timer, index) => {
                return (
                  <TimerTableRow
                    key={timer._id}
                    timer={timer}
                    index={index}
                    weekStartIsoDate={weekStartIsoDate}
                  />
                );
              })
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    margin: "16px",
                  }}
                >
                  no task to generate time sheet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timer;
