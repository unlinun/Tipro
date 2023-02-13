import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TagsInput from "./TagsInput";
import { getAllProjects } from "../api/projects";
import { useSelector } from "react-redux";

const TaskFrom = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: projects } = useQuery("projects", () => getAllProjects(token));
  const [tags, setTags] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [phase, setPhase] = useState(null);
  const schema = yup.object().shape({
    title: yup.string().required("Please provide title"),
    startDate: yup.date("Please provide date").required("Please provide date"),
    dueDate: yup.date("Please provide date").required("Please provide date"),
    projectId: yup.string().required("Please select project"),
    phaseId: yup.string().required("Please select phase"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const chooseProject = projects.projects.filter((project) => {
      return project._id === projectId;
    });

    setPhase(chooseProject[0]?.phase);
  }, [projectId]);

  const createTaskInfo = (data) => {
    console.log(data);
  };

  return (
    <form className="form form--task">
      <div className="form__item">
        <label className="form__label">task title*</label>
        <input
          type="text"
          name="title"
          className="form__input"
          placeholder="task title"
          {...register("title")}
        />
        <p className="form__alert form__alert--error">
          {errors?.title?.message}
        </p>
      </div>
      <div className="form__item">
        <div className="form__inputs">
          <label className="form__label">start*</label>
          <input
            type="date"
            name="startDate"
            className="form__input"
            {...register("startDate")}
          />
          <label className="form__label">end*</label>
          <input
            type="date"
            name="dueDate"
            className="form__input"
            {...register("dueDate")}
          />
        </div>
        <p className="form__alert form__alert--error">
          {errors?.startDate?.message}
        </p>
      </div>
      <div className="form__item">
        <div className="form__label">tags</div>
        <TagsInput tags={tags} setTags={setTags} />
        <p className="form__alert form__alert--error"></p>
      </div>
      <div className="form__item">
        <div className="form__label">project name*</div>
        <div className="select" {...register("projectId")}>
          <select
            className="select__input"
            name="projectId"
            defaultValue=""
            onChange={(e) => setProjectId(e.target.value)}
          >
            <option value="" disabled>
              choose project
            </option>
            {projects.projects.map((project) => {
              return (
                <option value={project._id} key={project._id}>
                  {project.title}
                </option>
              );
            })}
          </select>
        </div>
        <p className="form__alert form__alert--error">
          {errors?.projectId?.message}
        </p>
      </div>
      <div className="form__item">
        <div className="form__label">phase*</div>
        <div className="select">
          <select
            className="select__input"
            name="projectId"
            {...register("phaseId")}
          >
            {phase?.allPhase?.map((phase) => {
              return (
                <option value={phase._id} key={phase._id}>
                  {phase.title}
                </option>
              );
            })}
          </select>
        </div>
        <p className="form__alert form__alert--error">
          {errors?.phaseId?.message}
        </p>
      </div>
      <input
        className="form__submit"
        type="button"
        value="Create new project"
        onClick={handleSubmit(createTaskInfo)}
        form="form"
      />
      <p className="form__alert form__alert--error"></p>
    </form>
  );
};

export default TaskFrom;
