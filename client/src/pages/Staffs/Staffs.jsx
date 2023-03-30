import React from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { useQuery } from "react-query";
import { getAllStaffs } from "../../api/user";
const API_URL = process.env.REACT_APP_BASE_URL;

const Staffs = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { data: staffs } = useQuery("staffs", () => getAllStaffs(user, token));
  return (
    <div className="staffs">
      <div className="staffs__card card">
        <div className="card--flex card--flex">
          <div className="card__title  mg__b--20">Company staffs</div>
        </div>
        <table className="staffs__table table">
          <thead className="table__head">
            <tr className="table__row table__row--head">
              <th className="table__title"></th>
              <th className="table__title">username</th>
              <th className="table__title">avatar</th>
              <th className="table__title">position</th>
              <th className="table__title">birthday</th>
              <th className="table__title">email</th>
            </tr>
          </thead>
          <tbody className="table__body">
            {staffs?.map((staff, i) => {
              return (
                <tr className="table__row" key={staff._id}>
                  <td className="table__cell">{i + 1}</td>
                  <td className="table__cell">{staff.username}</td>
                  <td className="table__cell">
                    <div className="table__staff">
                      <img
                        className="table__image table__image--staff"
                        src={`${API_URL}/${staff.avatar}`}
                        alt={staff.username}
                        title={staff.username}
                      />
                    </div>
                  </td>
                  <td className="table__cell">{staff.position}</td>
                  <td className="table__cell">
                    {dateFormat(staff.birthday, "mm/dd")}
                  </td>
                  <td className="table__cell table__cell--low">
                    {staff.email}
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

export default Staffs;
