import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TagsInput from "./TagsInput";
import { getAllProjects } from "../api/projects";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../api/task";
import { setCreating } from "../state/authSlice";
import { Link, useNavigate } from "react-router-dom";

const TaskFrom = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  // 先取得所有 project
  const { data: projects } = useQuery("projects", () => getAllProjects(token));

  const [error, setError] = useState("");
  const [tags, setTags] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [phase, setPhase] = useState(null);

  // 表單驗證
  // 創建 yup schema
  const schema = yup.object().shape({
    title: yup.string().required("Please provide title"),
    startDate: yup
      .date()
      .typeError("Expected a value of type date")
      .required("Please provide date"),
    projectId: yup.string().required("Please select project"),
    phaseId: yup.string().required("Please select phase"),
  });

  // 使用 useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //選擇了項目後會顯示該項目的 project
  useEffect(() => {
    const chooseProject = projects?.projects.find((project) => {
      return project._id === projectId;
    });

    setPhase(chooseProject?.phase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  // 創建一個新的任務 new task 並且同時更新 project 的資料！(是否有更好的方法可以操作？當 task 新增時一併更新 project? 待研究 ，感覺用此方法好像有點影響效能，更新速度有點慢，大約要 90ms)
  const createTaskInfo = async (data, e) => {
    e.preventDefault();
    if (tags.length > 5) {
      setError("tags over 5");
      return;
    }
    const newTask = { ...data, tags };
    // createTask 的 response
    const res = await createTask(newTask, token);
    if (res.status === 201) {
      dispatch(setCreating());
      navigator(0);
      navigator("/user/tasks");
    } else {
      setError("Oops, Unable to create task");
    }
  };

  return (
    <form className="form form__absolute form__absolute--task">
      <p className="form__alert">
        No project yet?
        <Link to="/projects" onClick={() => dispatch(setCreating())}>
          go add one!
        </Link>
      </p>
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
            {projects?.projects.map((project) => {
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
            {phase?.map((phase) => {
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
      <div className="form__item form__item--center">
        <input
          className="btn btn--project"
          type="button"
          value="Create new task"
          onClick={handleSubmit(createTaskInfo)}
          form="form"
        />
        <p className="form__alert form__alert--error">{error}</p>
      </div>
    </form>
  );
};

export default TaskFrom;
