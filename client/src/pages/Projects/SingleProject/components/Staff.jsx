import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateProject } from "../../../../api/projects";
const API_URL = process.env.REACT_APP_BASE_URL;

const Staff = ({ project }) => {
  const [isEdit, setIsEdit] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const staffs = useSelector((state) => state.auth.staffs);
  const projectStaffId = project.staff.map((staff) => staff._id);
  const [newStaff, setNewStaff] = useState(projectStaffId);

  const notStaffs = staffs?.filter(
    (staff) => !projectStaffId.some((id) => id === staff._id)
  );

  const queryClient = useQueryClient();
  const { mutate: updateProjectItem } = useMutation(
    (updateProjectItem) => {
      return updateProject(updateProjectItem, token);
    },
    {
      onSettled: () => {
        queryClient.invalidateQueries("singleProject");
      },
    }
  );

  const handleUpdateStaff = () => {
    setIsEdit(false);
    updateProjectItem({
      _id: project._id,
      staff: newStaff,
    });
  };

  useEffect(() => {
    setNewStaff(projectStaffId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="project__card card project__staff">
      <div className="staff__manager">
        <h6>manager</h6>
        <div className="manager__info">
          <img src={`${API_URL}/${project?.manager[0].avatar}`} alt="manager" />
          <p>{project?.manager[0].username}</p>
        </div>
      </div>
      <div className="staff">
        <h6>staff</h6>
        <div className="staff__info">
          {project?.staff.map((staff, i) => {
            return (
              <div className="box flex flex__col gap--8" key={staff._id}>
                {user._id === project?.manager[0]._id ? (
                  <span
                    className="delete delete--gray"
                    onClick={() => {
                      updateProjectItem({
                        _id: project._id,
                        staff: projectStaffId.filter((_, index) => index !== i),
                      });
                    }}
                  >
                    -
                  </span>
                ) : (
                  ""
                )}

                <img
                  className="staff__image"
                  src={`${API_URL}/${staff?.avatar}`}
                  alt={staff.username}
                  title={staff.username}
                />
                <p>{staff.username}</p>
              </div>
            );
          })}
          {user._id === project?.manager[0]._id ? (
            <div className="box">
              {isEdit ? (
                <form className="edit__form">
                  <div className="close" onClick={() => handleUpdateStaff()}>
                    x
                  </div>
                  <div className="select">
                    <select
                      className="select__input"
                      onChange={(e) =>
                        setNewStaff([...newStaff, e.target.value])
                      }
                    >
                      <option value="">select staff</option>
                      {notStaffs?.map((staff) => {
                        return (
                          <option value={staff._id} key={staff._id}>
                            {staff.username}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              ) : (
                <div className="box box--add" onClick={() => setIsEdit(true)}>
                  <p>+</p>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Staff;
