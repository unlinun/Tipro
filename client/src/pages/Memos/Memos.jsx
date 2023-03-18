import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { getAllMemos } from "../../api/memo";

const Memos = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: memos } = useQuery("memos", () => getAllMemos(token));
  return (
    <div className="memos">
      <div className="card__title">memos</div>
      <div className="memos__card">
        {memos?.map((memo) => {
          return (
            <div className="card" key={memo._id}>
              <h6 className="title mg__b--12">
                {dateFormat(memo?.createdAt, "isoDate")}
              </h6>
              <p>{memo?.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memos;
