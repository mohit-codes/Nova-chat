import React, { useState } from "react";
import { useAuth } from "../../context/authProvider";

export const LeftUpperHeader = ({ setLeftSide }) => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="w-full shadow-md relative h-12 flex px-3 py-1 border-gray-400 items-center">
      <div className="bg-black rounded-full w-6 h-6 text-center">
        <div className="text-gray-200 font-bold">{user?.name[0]}</div>
      </div>
      <div className="font-semibold ml-3">Hi ,{user?.name}</div>
      <div className="ml-auto">
        <i
          onClick={() => setShowMenu((prevState) => !prevState)}
          className="fa fa-ellipsis-v mr-2"
        ></i>
      </div>
      {showMenu && (
        <div className="bg-black select-none absolute right-5 top-3/4 shadow-md rounded-md text-gray-200">
          <ul>
            <li>
              <button className="px-3 py-2" onClick={() => setLeftSide(true)}>
                settings
              </button>
            </li>
            <li>
              <button onClick={() => logout()} className="px-3 py-2">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
