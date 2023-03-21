import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { DeleteIcon } from "../../assets/icons";
import { getAllMemos, deleteMemo } from "../../api/memo";

const Memos = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: memos } = useQuery("memos", () => getAllMemos(token));
  const handleDeleteMemo = async (memo) => {
    const isDelete = window.confirm("delete memo?");
    if (isDelete) {
      await deleteMemo(memo, token);
    }
  };
  return (
    <div className="memos">
      <div className="card__title">memos</div>
      <div className="memos__card">
        {memos?.map((memo) => {
          return (
            <div className="card" key={memo._id}>
              <div className="flex flex--bt  mg__b--12">
                <h6 className="title">
                  {dateFormat(memo?.createdAt, "isoDate")}
                </h6>
                <span onClick={() => handleDeleteMemo(memo)}>
                  <DeleteIcon />
                </span>
              </div>
              <p>{memo?.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Memos;
