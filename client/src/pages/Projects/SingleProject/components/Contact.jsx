import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { updateProject } from "../../../../api/projects";

const Contact = ({ project, index, contact, setIsCreate }) => {
  const token = useSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    company: contact.company,
    name: contact.name,
    responsibility: contact.responsibility,
    contactNumber: contact.contactNumber,
  });

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

  const handleEditContact = () => {
    if (isEdit === false) {
      setIsEdit(true);
      setIsCreate(false);
      return;
    }
    setIsEdit(false);
    setIsCreate(false);

    const editContacts = [...project.contactInfo];
    editContacts[index] = contactInfo;
    updateProjectItem({
      _id: project._id,
      contactInfo: editContacts,
    });
  };
  return (
    <tr className="table__row">
      <td className="table__cell table__cell--flex">
        <div
          className="delete"
          onClick={() => {
            updateProjectItem({
              _id: project._id,
              contactInfo: project.contactInfo.filter((item, i) => index !== i),
            });
          }}
        >
          -
        </div>
        <div
          className="edit"
          onClick={() => {
            handleEditContact();
          }}
        >
          {isEdit ? "✔︎" : "✐"}
        </div>
      </td>
      <td className="table__cell">
        {isEdit ? (
          <input
            type="text"
            defaultValue={contact.name}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, name: e.target.value })
            }
          />
        ) : (
          `${contact.name}`
        )}
      </td>
      <td className="table__cell">
        {isEdit ? (
          <input
            type="text"
            defaultValue={contact.company}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, company: e.target.value })
            }
          />
        ) : (
          `${contact.company}`
        )}
      </td>
      <td className="table__cell">
        {isEdit ? (
          <input
            type="text"
            defaultValue={contact.responsibility}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, responsibility: e.target.value })
            }
          />
        ) : (
          `${contact.responsibility}`
        )}
      </td>
      <td className="table__cell">
        {isEdit ? (
          <input
            type="text"
            defaultValue={contact.contactNumber}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, contactNumber: e.target.value })
            }
          />
        ) : (
          `${contact.contactNumber}`
        )}
      </td>
    </tr>
  );
};

export default Contact;
