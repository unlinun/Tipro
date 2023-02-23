import React from "react";
import { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useSelector } from "react-redux";
import { updateProject } from "../../../../api/projects";

const Phase = ({ project }) => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [isAddTag, setIsAddTag] = useState(false);
  const [isAddPhase, setIsAddPhase] = useState(false);
  const [tag, setTag] = useState("");
  const [phase, setPhase] = useState("");

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

  const handleAddTag = (e) => {
    if (e.code === "Escape") setIsAddTag(false);
    if (e.code !== "Enter") return;
    if (tag.trim() !== "") {
      setIsAddTag(!isAddTag);
      updateProjectItem({
        _id: project._id,
        tags: [...project.tags, tag],
      });
    }
  };

  const handleAddPhase = (e) => {
    if (e.code === "Escape") setIsAddPhase(false);
    if (e.code !== "Enter") return;
    if (phase.trim() !== "") {
      setIsAddPhase(!isAddPhase);
      updateProjectItem({
        _id: project._id,
        phase: [
          ...project.phase,
          {
            title: phase,
          },
        ],
      });
    }
  };

  return (
    <div className="project__card card project__phase phase">
      <div className="content__text">
        <h6>current phase</h6>
        <div className="select">
          <select
            name="phase"
            className="select__input"
            onChange={(e) => {
              updateProjectItem({
                _id: project._id,
                currentPhase: e.target.value,
              });
            }}
          >
            <option disabled>{project?.phase.currentPhase}</option>
            {project?.phase.map((phase) => {
              return (
                <option value={phase.title} key={phase._id}>
                  {phase.title}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="content__text content__text--column">
        <h6>all phase</h6>
        <div className="content__box">
          {project?.phase.map((phase, i) => {
            return (
              <div className="box" key={i}>
                <span
                  className="delete delete--phase"
                  onClick={() => {
                    updateProjectItem({
                      _id: project._id,
                      phase: project.phase.filter((tag, index) => index !== i),
                    });
                  }}
                >
                  -
                </span>
                <span className="box" key={phase._id}>
                  {i + 1 < 10 ? `0${i + 1}` : i + 1} {phase.title}
                </span>
              </div>
            );
          })}
          {isAddPhase ? (
            <input
              type="text"
              className="content__input"
              onChange={(e) => setPhase(e.target.value)}
              onKeyDown={(e) => handleAddPhase(e)}
            />
          ) : (
            <span
              className="box box--add"
              onClick={() => setIsAddPhase(!isAddPhase)}
            >
              +
            </span>
          )}
        </div>
      </div>
      <div className="content__text  content__text--column">
        <h6>tags</h6>
        <div className="content__box content__box--white">
          {project?.tags.map((tag, i) => {
            return (
              <div className="box box--tag" key={i}>
                <span
                  className="delete"
                  onClick={() => {
                    updateProjectItem({
                      _id: project._id,
                      tags: project.tags.filter((tag, index) => index !== i),
                    });
                  }}
                >
                  -
                </span>
                <span className="tag">{tag}</span>
              </div>
            );
          })}
          {isAddTag ? (
            <input
              type="text"
              className="content__input"
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={(e) => handleAddTag(e)}
            />
          ) : (
            <span
              className="box box--add"
              onClick={() => setIsAddTag(!isAddTag)}
            >
              +
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Phase;
