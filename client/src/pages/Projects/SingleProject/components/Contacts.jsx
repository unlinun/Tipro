import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "react-query";
import { updateProject } from "../../../../api/projects";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const Contacts = ({ project }) => {
  const [isCreate, setIsCreate] = useState(false);
  const token = useSelector((state) => state.auth.token);
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

  const schema = yup.object().shape({
    name: yup.string().required("Please provide name"),
    company: yup.string().required("Please provide company"),
    responsibility: yup.string(),
    contactNumber: yup.string(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createContactInfo = (data, e) => {
    setIsCreate(false);
    updateProjectItem({
      _id: project._id,
      contactInfo: [...project.contactInfo, data],
    });
    reset();
  };

  return (
    <div className="project__card card project__contact">
      <div
        className="project__edit project__edit--add"
        onClick={() => {
          setIsCreate(!isCreate);
          reset();
        }}
      >
        +
      </div>
      {isCreate ? (
        <form className="edit__form">
          <div className="close" onClick={() => setIsCreate(false)}>
            x
          </div>
          <input
            type="text"
            placeholder="name"
            className={errors?.name?.message ? "error" : ""}
            {...register("name")}
          />
          <input
            type="text"
            placeholder="company"
            className={errors?.company?.message ? "error" : ""}
            {...register("company")}
          />
          <input
            type="text"
            placeholder="responsibility"
            {...register("responsibility")}
          />
          <input
            type="text"
            placeholder="contact number"
            {...register("contactNumber")}
          />
          <input
            type="button"
            value="add"
            onClick={handleSubmit(createContactInfo)}
          />
        </form>
      ) : (
        ""
      )}
      <div className="project__title">contact info</div>
      <table className="contact__table table">
        <thead className="table__head">
          <tr className="table__row table__row--head">
            <th className="table__title"></th>
            <th className="table__title">name</th>
            <th className="table__title">company</th>
            <th className="table__title">responsibility</th>
            <th className="table__title">contact number</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {project?.contactInfo.map((contact, index) => {
            return (
              <Contact
                contact={contact}
                index={index}
                project={project}
                key={contact._id}
                setIsCreate={setIsCreate}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
