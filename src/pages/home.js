/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ChatCardWrapper,
  CreateMenu,
  LeftUpperHeader,
  RightSection,
  SavedMessagesTile,
  StartConversation,
} from "../components/index";
import { useAuth } from "../context/authProvider";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { BASE_URL } from "../utils/utils";

export const Home = () => {
  const [rightSide, setRightSide] = useState(null);
  const { user } = useAuth();
  const [showStartMessage, setShowStartMessage] = useState(false);
  const { data: recipients, addItem: addRecipient } = useAxiosGet(
    "recipients",
    user._id
  );
  const { data: groups } = useAxiosGet("groups", user._id);
  console.log(recipients);
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
            <CreateMenu setShowStartMessage={setShowStartMessage} />
            {showStartMessage && (
              <StartConversation
                addRecipient={addRecipient}
                setShowStartMessage={setShowStartMessage}
              />
            )}
            <SavedMessagesTile callback={() => setRightSide("saved")} />
            {recipients?.map((recipient) => {
              return (
                <ChatCardWrapper
                  callback={() => setRightSide(recipient)}
                  key={recipient._id}
                >
                  {recipient.name}
                </ChatCardWrapper>
              );
            })}
          </div>
        </div>
        <div className="w-full h-full">
          {rightSide == null ? (
            <div className="flex bg-cyanShade h-full justify-center rounded-r-md items-center">
              <p className="text-2xl text-white font-bold">Nova Chat</p>
            </div>
          ) : (
            <RightSection recipient={rightSide} />
          )}
        </div>
      </div>
    </div>
  );
};
