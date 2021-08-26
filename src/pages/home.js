import React, { useState } from "react";
import {
  LeftUpperHeader,
  RightSection,
  SavedMessagesTile,
} from "../components/index";
import { useAuth } from "../context/authProvider";
import { useAxiosGet } from "../hooks/useAxiosGet";

export const Home = () => {
  const [rightSide, setRightSide] = useState(null);
  const { user } = useAuth();
  const [showStartMessage, setShowStartMessage] = useState(false);
  const { data: recipients } = useAxiosGet("recipients", user._id);
  const { data: groups } = useAxiosGet("groups", user._id);
  console.log(recipients, groups);

  return (
    <div className="min-h-screen bg-background px-36 pt-14">
      <div className="mr-auto ml-auto flex h-600 w-full bg-back rounded-md">
        <div className="flex-col flex w-1/3">
          <LeftUpperHeader />
          <div className="overflow-y-auto h-full">
            <div className="px-3 py-2">
              <input
                type="text"
                className="rounded-full w-full my-2 px-3 py-1 shadow-md"
                placeholder="search"
              />
            </div>
            <div className="flex mb-3 px-3 justify-between">
              <button
                onClick={() => setShowStartMessage(true)}
                className="rounded-full px-2 py-1 shadow-md"
              >
                <i className="fa fa-comment mr-2"></i>New Message
              </button>
              <button className="rounded-full  px-2 py-1 shadow-md">
                <i className="fa fa-users mr-2"></i>New Group
              </button>
            </div>
            {showStartMessage && (
              <div className="w-full px-2 mb-2">
                <input
                  type="text"
                  className="rounded-full w-full my-2 px-3 py-1 shadow-md"
                  placeholder="Recipient Email"
                />
                <button className="rounded-full px-3 py-1 shadow-md">
                  Start
                </button>
                <i
                  onClick={() => setShowStartMessage(false)}
                  className="fa fa-close ml-2"
                ></i>
              </div>
            )}
            <SavedMessagesTile callback={() => setRightSide("saved")} />
          </div>
        </div>
        <div className="w-full h-full">
          {rightSide == null ? (
            <div className="flex bg-cyanShade h-full justify-center rounded-r-md items-center">
              <p className="text-2xl text-white font-bold">Nova Chat</p>
            </div>
          ) : (
            <RightSection receiverId={rightSide} />
          )}
        </div>
      </div>
    </div>
  );
};
