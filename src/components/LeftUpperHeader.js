import React from "react";
import { useAuth } from "../context/authProvider";

export const LeftUpperHeader = () => {
  const { user, logout } = useAuth();
  return (
    <div className="w-full h-12 flex px-3 py-1 border-b-2 border-gray-400 items-center">
      <div className="bg-black rounded-full w-6 h-6 text-center">
        <div className="text-gray-200 font-bold">{user?.name[0]}</div>
      </div>
      <div className="font-semibold ml-3">Hi ,{user?.name}</div>
      <div className="ml-auto">
        <i
          onClick={() => logout()}
          className="fa fa-sign-out cursor-pointer"
        ></i>
      </div>
    </div>
  );
};
