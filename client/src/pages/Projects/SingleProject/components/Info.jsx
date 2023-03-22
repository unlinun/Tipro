import React from "react";
import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getCountry } from "../../../../api/projects";
import { updateProject } from "../../../../api/projects";
import { useSelector } from "react-redux";

const Info = ({ project }) => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  // 當使用者選擇某一個國家時，會根據所選國家來跳出該國家的城市
  const [currentCountry, setCurrentCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [projectTitle, setProjectTitle] = useState(project.title);
  const [projectDescription, setProjectDescription] = useState(
    project.description
  );

  const { data: countries } = useQuery("country", getCountry);
  //  當 country 改變時，也改變 cities 的數值
  useEffect(() => {
    const data = countries?.filter((country) => {
      return country?.country === currentCountry;
    });
    if (!data) return;
    setCities(data[0]?.cities);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountry]);

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

  const handleInfoUpdate = () => {
    setIsEdit(!isEdit);
    if (projectTitle === "" || projectDescription === "") return;
    if (isEdit === true) {
      updateProjectItem({
        _id: project._id,
        title: projectTitle,
        description: projectDescription,
      });
    }
  };

  return (
    <div className="project__card card project__info">
      <div className="project__edit" onClick={(e) => handleInfoUpdate(e)}>
        {isEdit ? "X" : "Edit"}
      </div>
      {isEdit ? (
        <input
          type="text"
          name="title"
          className="project__title"
          defaultValue={project?.title}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
      ) : (
        <div className="project__title">{project?.title}</div>
      )}

      <div className="info">
        <div className="info__description">
          <h6>Project description</h6>
          {isEdit ? (
            <textarea
              name="description"
              cols="30"
              rows="10"
              defaultValue={project?.description}
              onChange={(e) => setProjectDescription(e.target.value)}
            ></textarea>
          ) : (
            <p>{project?.description}</p>
          )}
        </div>
        <div className="content__text">
          <h6>start date</h6>
          {isEdit ? (
            <input
              type="date"
              name="startDate"
              defaultValue={dateFormat(project?.startDate, "isoDate")}
              onChange={(e) =>
                updateProjectItem({
                  _id: project._id,
                  startDate: e.target.value,
                })
              }
            />
          ) : (
            <p>{dateFormat(project?.startDate, "isoDate")}</p>
          )}
        </div>
        <div className="content__text">
          <h6>location</h6>
          {isEdit ? (
            <div className="content__selects">
              <div className="select">
                <select
                  name="status"
                  className="select__input"
                  defaultValue={project?.location.country}
                  onChange={(e) => {
                    setCurrentCountry(e.target.value);
                  }}
                >
                  {countries?.map((country, i) => {
                    return (
                      <option value={country.country} key={i}>
                        {country.country}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="select">
                <select
                  name="status"
                  className="select__input"
                  defaultValue={project?.location.city}
                  onChange={(e) =>
                    updateProjectItem({
                      _id: project._id,
                      location: {
                        country: currentCountry,
                        city: e.target.value,
                      },
                    })
                  }
                >
                  {cities?.map((city, i) => {
                    return (
                      <option value={city} key={i}>
                        {city}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            <p>
              {project?.location.country}, {project?.location.city}
            </p>
          )}
        </div>
        <div className="content__text">
          <h6>business owner</h6>
          {isEdit ? (
            <input
              type="text"
              defaultValue={project?.businessOwner}
              onChange={(e) =>
                updateProjectItem({
                  _id: project._id,
                  businessOwner: e.target.value,
                })
              }
            />
          ) : (
            <p>{project?.businessOwner}</p>
          )}
        </div>
        <div className="content__text">
          <h6>status</h6>
          <div className={`select select--status--${(project?.status).trim()}`}>
            <select
              name="status"
              className="select__input"
              defaultValue={project?.status}
              onChange={(e) =>
                updateProjectItem({
                  _id: project._id,
                  status: e.target.value,
                })
              }
            >
              <option value="initiating">initiating</option>
              <option value="in progress">inprogress</option>
              <option value="canceled">canceled</option>
              <option value="finished">finished</option>
            </select>
          </div>
        </div>
        <div className="content__text">
          <h6>priority</h6>
          <div className={`select select--priority--${project?.priority}`}>
            <select
              name="priority"
              className="select__input"
              defaultValue={project?.priority}
              onChange={(e) =>
                updateProjectItem({
                  _id: project._id,
                  priority: e.target.value,
                })
              }
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
