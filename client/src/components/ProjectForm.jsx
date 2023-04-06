import React from "react";
import { useQuery } from "react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, getCountry } from "../api/projects";
import { setCreating } from "../state/authSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import TagsInput from "./TagsInput";

const ProjectForm = () => {
  const navigator = useNavigate();

  //  創建 yup schema , 進行表單驗證
  const schema = yup.object().shape({
    title: yup.string().required("Please provide project title"),
    description: yup
      .string()
      .min(5, "Description cannot less than 5")
      .max(100, "Description cannot over 100")
      .required("Please provide description"),
    location: yup.object().shape({
      country: yup.string().required("Please provide country"),
      city: yup.string().required("Please provide city"),
    }),
    startDate: yup
      .date()
      .typeError("Expected a value of type date")
      .required("Please provide start date"),
    status: yup.string().required("Please provide status"),
    priority: yup.string().required("Please provide priority"),
    businessOwner: yup.string().required("PLease provide business owner"),
    tags: yup.array(),
    manager: yup.string().required("Please provide manager"),
    staff: yup.array(),
    phase: yup.array(
      yup
        .object()
        .shape({
          title: yup.string().required("Please provide title"),
        })
        .required("please provide phase")
    ),
    contact: yup.array(
      yup.object().shape({
        name: yup.string().required("PLease provide name"),
      })
    ),
  });

  // 使用 useForm 來驗證表單，並取得 error 資訊
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // 目前還沒找到好的方法來創建 array object，先使用 useState()來保存資料
  const [error, setError] = useState("");
  // 當使用者選擇某一個國家時，會根據所選國家來跳出該國家的城市
  const [currentCountry, setCurrentCountry] = useState("");
  const [cities, setCities] = useState([]);
  // 當按下加或減時，增加或刪除格數
  const [phase, setPhase] = useState([{ title: "" }]);
  const [contactInfo, setContactInfo] = useState([
    { company: "", name: "", responsibility: "", contactNumber: "" },
  ]);
  const [tags, setTags] = useState([]);
  const [staff, setStaff] = useState([]);
  // 取得 status
  const token = useSelector((state) => state.auth.token);
  const staffs = useSelector((state) => state.auth.staffs);
  const status = useSelector((state) => state.project.status);
  const dispatch = useDispatch();

  const { data: countries } = useQuery("country", getCountry);

  //  當 country 改變時，也改變 cities 的數值
  useEffect(() => {
    const data = countries?.filter((country) => {
      return country?.country === currentCountry;
    });

    if (!data) return;
    setCities(data[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountry]);

  // 取得表單中階段的資料
  const handleSetPhase = (e, i, item) => {
    const { value } = e.target;
    const list = [...phase];
    list[i][item] = value;
    setPhase(list);
  };

  // 取得表單中 staff 的資料
  const handleSetStaff = (option) => {
    const data = option.map((item) => item.value);
    if (data.length <= 0) return;
    setStaff(data);
  };

  // 取得表單中 contactInfo 的資料
  const handleContactInfo = (e, i, item) => {
    const { value } = e.target;
    const list = [...contactInfo];
    list[i][item] = value;
    setContactInfo(list);
  };

  // 與後段串接，創建一個 project
  const createProjectInfo = async (data, e) => {
    e.preventDefault();
    const createData = {
      ...data,
      phase: phase,
      currentPhase: phase[0].title,
      tags,
      staff,
      contactInfo,
    };
    const res = await createProject(createData, token);
    if (res.status === 201) {
      dispatch(setCreating());
      navigator("/user/projects");
      navigator(0);
    } else {
      setError("Oops, Unable to create project");
    }
  };

  return (
    <form className="form form__absolute form__absolute--project" id="form">
      <div className="form__section">
        <div className="form__item">
          <label className="form__label">project title*</label>
          <input
            type="text"
            name="title"
            className="form__input"
            placeholder="project title"
            {...register("title")}
          />
          <p className="form__alert form__alert--error">
            {errors?.title?.message}
          </p>
        </div>
        <div className="form__item">
          <label className="form__label">description*</label>
          <textarea
            name="description"
            className="form__input"
            cols="30"
            rows="10"
            placeholder="Type something.."
            {...register("description")}
          ></textarea>
          <p className="form__alert form__alert--error">
            {errors?.description?.message}
          </p>
        </div>
        <div className="form__item">
          <label className="form__label">start date*</label>

          <input
            type="date"
            name="startDate"
            className="form__input"
            {...register("startDate")}
          />
          <p className="form__alert form__alert--error">
            {errors?.startDate?.message}
          </p>
        </div>
        <div className="form__item">
          <div className="form__label">location*</div>
          <div className="form__inputs">
            <div className="select" {...register("location.country")}>
              <select
                className="select__input"
                name="location.country"
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
              >
                <option value="country" disabled>
                  country
                </option>
                {countries?.map((country, i) => {
                  return (
                    <option value={country?.country} key={i}>
                      {country?.country}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select" {...register("location.city")}>
              <select className="select__input" name="location.city">
                <option value="city" disabled>
                  city
                </option>
                {cities?.cities?.map((city, i) => {
                  return (
                    <option value={city} key={city}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <p className="form__alert form__alert--error">
            {errors?.location?.city?.message}
          </p>
        </div>
        <div className="form__item">
          <div className="form__label">business owner*</div>
          <input
            type="text"
            name="businessOwner"
            className="form__input"
            {...register("businessOwner")}
          />
          <p className="form__alert form__alert--error">
            {errors?.businessOwner?.message}
          </p>
        </div>
        <div className="form__item">
          <div className="form__label">status</div>
          <div className="select">
            <select
              className="select__input"
              name="country"
              {...register("status")}
            >
              {status.map((status, i) => {
                return (
                  <option value={status} key={i}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">priority</div>
          <div className="select" {...register("priority")}>
            <select className="select__input" name="priority">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
          <p className="form__alert form__alert--error">
            {errors?.priority?.message}
          </p>
        </div>
      </div>
      <div className="form__section">
        <div className="form__item">
          <div className="form__label">phase*</div>
          {phase.map((phase, i) => {
            return (
              <div className="form__inputs" key={i}>
                <input
                  type="text"
                  name={`phase.${i}.title`}
                  className="form__input"
                  {...register(`phase.${i}.title`)}
                  onChange={(e) => {
                    handleSetPhase(e, i, "title");
                  }}
                  value={phase.title}
                />
              </div>
            );
          })}
          <div className="form__function">
            <div
              className="form__add"
              onClick={() =>
                setPhase((phase) => [...phase, { title: "", dueDate: "" }])
              }
            >
              +
            </div>
            <div
              className="form__delete"
              onClick={() => setPhase((phase) => phase.slice(0, -1))}
            >
              -
            </div>
          </div>
          <p className="form__alert form__alert--error">
            {errors?.phase ? "Please provide at least one phase" : ""}
          </p>
        </div>
        <div className="form__item">
          <div className="form__label">tags</div>
          <TagsInput tags={tags} setTags={setTags} />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">project manager</div>
          <div className="select">
            <select
              className="select__input"
              name="manager"
              {...register("manager")}
            >
              {staffs?.map((staff, i) => {
                return (
                  <option value={staff._id} key={staff._id}>
                    {staff.username}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">staffs</div>
          <Select
            className="select__multi"
            options={staffs?.map((staff) => {
              return { value: staff._id, label: staff.username };
            })}
            isMulti
            isSearchable={true}
            onChange={(e) => handleSetStaff(e)}
          />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">contact*</div>
          {contactInfo?.map((contact, i) => {
            return (
              <div className="form__inputs" key={i}>
                <input
                  type="text"
                  className="form__input"
                  name={`contact.${i}.company`}
                  placeholder="company"
                  onChange={(e) => {
                    handleContactInfo(e, i, "company");
                  }}
                />
                <input
                  type="text"
                  name={`contact.${i}.name`}
                  className="form__input"
                  placeholder="name"
                  {...register(`contact.${i}.name`)}
                  onChange={(e) => {
                    handleContactInfo(e, i, "name");
                  }}
                />
                <input
                  type="text"
                  name={`contact.${i}.responsibility`}
                  className="form__input"
                  placeholder="responsibility"
                  onChange={(e) => {
                    handleContactInfo(e, i, "responsibility");
                  }}
                />
                <input
                  type="text"
                  name={`contact.${i}.contactNumber`}
                  className="form__input"
                  placeholder="0988-123-456"
                  onChange={(e) => {
                    handleContactInfo(e, i, "contactNumber");
                  }}
                />
              </div>
            );
          })}
          <div className="form__function">
            <div
              className="form__add"
              onClick={() =>
                setContactInfo((contact) => [
                  ...contact,
                  {
                    company: "",
                    name: "",
                    responsibility: "",
                    contactNumber: "",
                  },
                ])
              }
            >
              +
            </div>
            <div
              className="form__delete"
              onClick={() => setContactInfo((contact) => contact.slice(0, -1))}
            >
              -
            </div>
          </div>
          <p className="form__alert form__alert--error">
            {errors?.contact ? "Please provide name" : ""}
          </p>
        </div>
      </div>
      <input
        className="btn btn--project"
        type="button"
        value="Create new project"
        onClick={handleSubmit(createProjectInfo)}
        form="form"
      />
      <p className="form__alert form__alert--error">{error}</p>
    </form>
  );
};

export default ProjectForm;
