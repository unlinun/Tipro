import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateTimer } from "../../../api/timer";
import { EditIcon, TickCircleIcon } from "../../../assets/icons";

const TimeSheet = ({ time }) => {
  const token = useSelector((state) => state.auth.token);
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateRecordItem } = useMutation(
    (updateRecordItem) => {
      return updateTimer(updateRecordItem, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("dateTimer");
      },
    }
  );
  if (!time) {
    return (
      <tr style={{ textAlign: "center", justifySelf: "center" }}>
        <td
          style={{
            textAlign: "center",
            margin: "16px",
          }}
        >
          no task to create time sheet
        </td>
      </tr>
    );
  }

  const handleUpdateDuration = (type, e, id, currentDuration) => {
    let hour = currentDuration / 3600;
    let min = (currentDuration % 3600) / 60;
    let duration = 0;
    const value = Number(e.target.value.trim());
    if (!isNaN(value)) {
      if (type === "hour") {
        duration += value * 3600 + min * 60;
      } else {
        duration += value * 60 + hour * 60 * 60;
      }
    }
    updateRecordItem({
      _id: time._id,
      recordId: id,
      duration: duration,
    });
  };

  return (
    <>
      {isEdit
        ? time?.timeRecord.map((record) => (
            <td className="table__cell table__cell--low " key={record._id}>
              <div className="flex gap--8">
                <div className="flex gap--4">
                  <input
                    type="text"
                    defaultValue={
                      Math.floor(record.duration / 3600) >= 10
                        ? Math.floor(record.duration / 3600)
                        : `0${Math.floor(record.duration / 3600)}`
                    }
                    onChange={(e) =>
                      handleUpdateDuration(
                        "hour",
                        e,
                        record._id,
                        record.duration
                      )
                    }
                  />
                  <span>hr</span>
                </div>
                <div className="flex gap--4">
                  <input
                    type="text"
                    defaultValue={
                      Math.floor((record.duration % 3600) / 60) >= 10
                        ? Math.floor((record.duration % 3600) / 60)
                        : `0${Math.floor((record.duration % 3600) / 60)}`
                    }
                    onChange={(e) =>
                      handleUpdateDuration(
                        "minute",
                        e,
                        record._id,
                        record.duration
                      )
                    }
                  />
                  min
                </div>
              </div>
            </td>
          ))
        : time?.timeRecord.map((record) => (
            <td className="table__cell table__cell--low" key={record._id}>
              <div className="flex gap--8">
                <div className="tags__tag ">
                  <span className="tags__tag--bold">
                    {Math.floor(record.duration / 3600) >= 10
                      ? Math.floor(record.duration / 3600)
                      : `0${Math.floor(record.duration / 3600)}`}
                  </span>
                  hr
                </div>
                <div className="tags__tag ">
                  <span className="tags__tag--bold">
                    {Math.floor((record.duration % 3600) / 60) >= 10
                      ? Math.floor((record.duration % 3600) / 60)
                      : `0${Math.floor((record.duration % 3600) / 60)}`}
                  </span>
                  min
                </div>
              </div>
            </td>
          ))}
      <td className="table__cell">
        <div className="table__function">
          <div className="table__edit">
            {isEdit ? (
              <span
                onClick={() => setIsEdit(false)}
                className="table__icon table__icon--green"
              >
                <TickCircleIcon />
              </span>
            ) : (
              <span onClick={() => setIsEdit(true)} className="table__icon">
                <EditIcon />
              </span>
            )}
          </div>
        </div>
      </td>
    </>
  );
};

export default TimeSheet;
