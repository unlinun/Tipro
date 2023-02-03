import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Select from "react-select";
import TagsInput from "./TagsInput";

const ProjectForm = () => {
  const [currentCountry, setCurrentCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [phases, setPhases] = useState([{ title: "" }]);
  const status = useSelector((state) => state.project.status);
  //  取得country
  const getCountry = async () => {
    return await axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((res) => {
        return res.data.data;
      });
  };
  const { data: countries } = useQuery("country", getCountry);

  useEffect(() => {
    const data = countries?.filter((country) => {
      return country?.country === currentCountry;
    });
    if (!data) return;
    setCities(data[0]);
  }, [currentCountry]);

  return (
    <form className="form form--project">
      <div className="form__section">
        <div className="form__item">
          <label className="form__label">project title</label>
          <input type="text" name="title" className="form__input" />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <label className="form__label">description</label>
          <textarea
            name="description"
            className="form__input"
            cols="30"
            rows="10"
          ></textarea>
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <label className="form__label">start date</label>
          <input type="date" name="startDate" className="form__input" />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">location</div>
          <div className="form__inputs">
            <div className="select">
              <select
                className="select__input"
                name="country"
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
              >
                <option value="country" disabled>
                  country
                </option>
                {countries?.map((country) => {
                  return (
                    <option value={country?.country} key={nanoid()}>
                      {country?.country}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="select">
              <select className="select__input" name="country">
                <option value="city" disabled>
                  city
                </option>
                {cities?.cities?.map((city) => {
                  return (
                    <option value={city} key={nanoid()}>
                      {city}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">business owner</div>
          <input type="text" name="businessOwner" className="form__input" />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">status</div>
          <div className="select">
            <select className="select__input" name="country">
              {status.map((status) => {
                return (
                  <option value={status} key={nanoid()}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <p className="form__alert form__alert--error"></p>
        </div>
      </div>
      <div className="form__section">
        <div className="form__item">
          <div className="form__label">phase</div>
          {phases.map((phase, i) => {
            return (
              <div className="form__inputs" key={nanoid()}>
                <input
                  type="text"
                  className="form__input"
                  name="phase.title"
                  id=""
                />
                <input
                  type="date"
                  name="phase.dueDate"
                  className="form__input"
                />
              </div>
            );
          })}
          <div className="form__add">+</div>
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">tags</div>
          <TagsInput />
          <p className="form__alert form__alert--error"></p>
        </div>
        <div className="form__item">
          <div className="form__label">project manager</div>
          <div className="select">
            <select className="select__input" name="country">
              {status.map((status) => {
                return (
                  <option value={status} key={nanoid()}>
                    {status}
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
            options={status.map((status) => {
              return { value: status, label: status };
            })}
            isMulti
            isSearchable={true}
          />
          <p className="form__alert form__alert--error"></p>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
