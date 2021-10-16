/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { axiosDelete, BASE_URL } from "../../utils/utils";

export const Settings = ({ setLeftSide }) => {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState(user.name);
  const [showEditName, setShowEditName] = useState(false);
  const deleteHandler = async () => {
    await axiosDelete("users", user._id);
    logout();
  };
  const updateHandler = async (event) => {
    event.preventDefault();
    setUser((prevState) => {
      return { ...prevState, name: name };
    });
    localStorage.setItem("user", JSON.stringify({ ...user, name: name }));
    setShowEditName(false);
    await axios.put(`${BASE_URL}/users/update/${user._id}`, {
      name: name,
    });
  };

  return (
    <div className="w-1/3 flex flex-col pb-2">
      <div className="shadow-md h-12 flex items-center px-3">
        <i className="fa fa-arrow-left" onClick={() => setLeftSide(false)}></i>
        <span className="font-medium ml-5">Settings</span>
      </div>
      <div className="border-2 border-gray-200 bg-white mt-4 px-3 py-2">
        <div>
          <span className="font-medium"> Name </span>
          <i
            className="fa fa-pencil float-right"
            onClick={() => setShowEditName(true)}
          ></i>
        </div>
        {showEditName ? (
          <div>
            <form onSubmit={(e) => updateHandler(e)}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full w-full my-2 px-3 py-1 shadow-md"
              />
              <button
                type="submit"
                disabled={name === "" || name === user.name}
                className={`rounded-full px-3 py-1 shadow-md ${
                  name === "" || name === user.name
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                Save
              </button>
            </form>
            <i
              onClick={() => {
                setName(user.name);
                setShowEditName(false);
              }}
              className="fa fa-close ml-2"
            ></i>
          </div>
        ) : (
          <p>{name} </p>
        )}
      </div>
      <div className="border-2 border-gray-200 bg-white mt-4 px-3 py-2">
        <p className="font-medium">Email</p>
        <p>{user.email}</p>
      </div>
      <div className="border-2 border-gray-200 mt-auto px-3 py-2">
        <div
          className="flex justify-between items-center text-red-600 cursor-pointer"
          onClick={() => deleteHandler()}
        >
          <span>Delete Account</span>
          <i className="fa fa-trash"></i>
        </div>
      </div>
    </div>
  );
};
