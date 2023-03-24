import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { getDateTimer, getAllTimer, updateTimer } from "../../api/timer";

import TimeSheet from "./components/TimeSheet";
import dateFormat from "dateformat";
import TimeProject from "./components/TimeProject";
const Timer = () => {
  const token = useSelector((state) => state.auth.token);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString());
  const [allTimers, setAllTimers] = useState([]);
  let weekDate = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date(currentDate);
  const dayOfWeek = today.getDay();
  const date = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  const weekStartDate = new Date(
    new Date(today.setDate(date)).setUTCHours(0, 0, 0, 0)
  );
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekEndDate.getDate() + 6);

  //取得整週的日期與週一週二...
  const weekDates = [...Array(7)].map((_, i) => {
    const currentDate = new Date(weekStartDate);
    currentDate.setDate(currentDate.getDate() + i);
    return {
      day: weekDate[currentDate.getDay()],
      date: currentDate.toISOString(),
    };
  });

  // 使用 useQuery 取得 date timer data
  const queryClient = useQueryClient();
  const { data: timers, refetch } = useQuery("dateTimer", () =>
    getDateTimer(weekStartDate.toISOString(), token)
  );

  // get current week's timeRecord!!!
  const timer = timers?.map((timer) => {
    return {
      _id: timer._id,
      project: timer.project,
      task: timer.task,
      timeRecord: timer.timeRecord.filter((time) => {
        return (
          new Date(time.dateOfWeek) >= new Date(weekStartDate) &&
          new Date(time.dateOfWeek) <= new Date(weekEndDate)
        );
      }),
    };
  });

  const handleDateChange = async (e) => {
    setCurrentDate(e.target.value);
  };
  const handleRenew = async () => {
    await updateTimer(currentDate, token);
    refetch();
  };

  useEffect(() => {
    const fetchTimer = async () => {
      const data = await getDateTimer(weekStartDate.toISOString(), token);
      const allData = await getAllTimer(token);
      setAllTimers(allData);
      queryClient.setQueryData("dateTimer", data);
    };
    fetchTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

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
              onChange={(e) => handleDateChange(e)}
            />
            <button className="btn btn--time" onClick={() => handleRenew()}>
              renew
            </button>
          </div>
          <div className="card__text card__text--sm">
            {`${dateFormat(weekStartDate, "mm/dd")} - ${dateFormat(
              weekEndDate,
              "mm/dd"
            )}`}
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
                      <p>{dateFormat(date.date, "mm/dd")}</p>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="table__body">
            {timer?.length > 0 ? (
              timer?.map((time, i) => (
                <tr className="table__row" key={time._id}>
                  <td className="table__cell">{i + 1}</td>
                  <td
                    className="table__cell"
                    style={{ justifyContent: "flex-start" }}
                  >
                    {time?.project.title}
                  </td>
                  <td className="table__cell">{time?.task.title}</td>
                  <TimeSheet time={time} refetch={refetch} />
                </tr>
              ))
            ) : (
              <tr style={{ textAlign: "center", justifySelf: "center" }}>
                <td
                  style={{
                    textAlign: "center",
                    margin: "16px",
                  }}
                >
                  time sheet is empty
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
        <table className="timer__table timer__table--time">
          <thead className="table__head">
            <tr className="table__row table__row--time table__row--head">
              <th className="table__title"></th>
              <th className="table__title">project</th>
              <th className="table__title">start Date</th>
              <th className="table__title">phase</th>
              <th className="table__title">total tasks</th>
              <th className="table__title">duration</th>
            </tr>
          </thead>
          <tbody className="table__body">
            <TimeProject timer={timer} timers={allTimers} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timer;
