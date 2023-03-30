import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import { updateUser } from "../../api/user";
import { setUser } from "../../state/authSlice";
const API_URL = process.env.REACT_APP_BASE_URL;

const Setting = () => {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState("");
  const [avatarFile, setAvatarFile] = useState(user.avatar);
  const [avatarUrl, setAvatarUrl] = useState(`${API_URL}/${user.avatar}`);
  const [username, setUsername] = useState(user.username);
  const [position, setPosition] = useState(user.position);
  const [birthday, setBirthday] = useState(user.birthday);
  const [email, setEmail] = useState(user.email);

  const hiddenFileInput = useRef(null);

  const handleFileUpload = (e) => {
    hiddenFileInput.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1000000) {
      return setError("image size cannot over 1mb");
    } else {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateUser = async () => {
    setIsEdit(!isEdit);
    setError("");
    if (username === "" || position === "" || birthday === "" || email === "")
      return;

    if (isEdit === true) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      formData.append("_id", user._id);
      formData.append("username", username);
      formData.append("position", position);
      formData.append("birthday", birthday);
      formData.append("email", email);
      const data = await updateUser(formData, token);
      if (data) dispatch(setUser(data));
    }
  };

  return (
    <div className="setting">
      <div className="card__title mg__b--20">user</div>
      <div className="setting__card card flex flex__col  gap--40">
        <div className="project__edit" onClick={() => handleUpdateUser()}>
          {isEdit ? "✔︎" : "EDIT"}
        </div>
        <div className="card--flex flex ">
          <div className="card--flex flex__col">
            {isEdit ? (
              <div className="card--flex flex__col flex--cen mg__b--20">
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                  onChange={handleFileChange}
                  name="avatar"
                />
                <p className="form__alert form__alert--error">{error}</p>
                <img
                  className="setting__image"
                  src={avatarUrl}
                  alt={avatarUrl}
                />
                <div className="btn btn--form" onClick={handleFileUpload}>
                  upload avatar
                </div>
                <p>{avatarFile.name}</p>
              </div>
            ) : (
              <img
                className="setting__image"
                src={`${API_URL}/${user.avatar}`}
                alt={user.username}
              />
            )}
            <div className="card--flex flex--cen card__text">
              <div className="card__text">username:</div>
              {isEdit ? (
                <input
                  type="text"
                  defaultValue={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <div className="card__text">{user.username}</div>
              )}
            </div>
          </div>
        </div>
        <div className="card--flex flex--cen">
          <div className="card__text">position:</div>
          {isEdit ? (
            <div className="select">
              <select
                defaultValue={user.position}
                className="select__input"
                onChange={(e) => setPosition(e.target.value)}
              >
                <option value="ceo">ceo</option>
                <option value="general manager">general manager</option>

                <option value="manager">manager</option>
                <option value="project manager">project manager</option>

                <option value="designer">designer</option>
                <option value="accountant">accountant</option>
              </select>
            </div>
          ) : (
            <div className="card__text">{user.position}</div>
          )}
        </div>
        <div className="card--flex flex--cen">
          <div className="card__text">birthday:</div>
          {isEdit ? (
            <input
              type="date"
              defaultValue={dateFormat(user.birthday, "isoDate")}
              onChange={(e) => setBirthday(e.target.value)}
            />
          ) : (
            <div className="card__text">
              {dateFormat(user.birthday, "isoDate")}
            </div>
          )}
        </div>
        <div className="card--flex flex--cen">
          <div className="card__text">email:</div>
          {isEdit ? (
            <input
              type="text"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <div className="card__text">{user.email}</div>
          )}
        </div>
        <div className="card--flex flex--cen">
          <div className="card__text">company id:</div>
          {user.companyID}
        </div>
      </div>
    </div>
  );
};

export default Setting;
