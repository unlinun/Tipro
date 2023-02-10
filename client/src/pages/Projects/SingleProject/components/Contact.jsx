import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient, useMutation } from "react-query";
import { updateProject } from "../../../../api/projects";
import { useSelector } from "react-redux";

const Contact = ({ project }) => {
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
    <div className="project__box project__contact">
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
        <form className="contact__form">
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
          {project?.contactInfo.map((contact, i) => {
            return (
              <tr className="table__row" key={i}>
                <td className="table__cell">
                  <div
                    className="delete"
                    onClick={() => {
                      updateProjectItem({
                        _id: project._id,
                        contactInfo: project.contactInfo.filter(
                          (item, index) => index !== i
                        ),
                      });
                    }}
                  >
                    -
                  </div>
                </td>
                <td className="table__cell">{contact.name}</td>
                <td className="table__cell">{contact.company}</td>
                <td className="table__cell">{contact.responsibility}</td>
                <td className="table__cell">{contact.contactNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
