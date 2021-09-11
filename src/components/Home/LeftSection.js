/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  ChatCardWrapper,
  CreateMenu,
  LeftUpperHeader,
  SavedMessagesTile,
  StartConversation,
} from "../index";
import { useAuth } from "../../context/authProvider";
import { useSocket } from "../../context/socket";
import { useData } from "../../context/dataProvider";
import { CreateGroupForm } from "./CreateGroupForm";

export const LeftSection = ({ setRightSide }) => {
  const { user } = useAuth();
  const socket = useSocket();
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const { groups, recipients, addRecipient, addGroup } = useData();

  let flag = true;
  useEffect(() => {
    // socket.on("onlineUsers", (res) => {
    //   console.log(res);
    // });
    socket.on("newRecipient", (info) => {
      flag = !flag;
      if (recipients.findIndex((r) => r._id === info.sender._id) === -1) {
        addRecipient(info.sender);
      }
    });
  }, [flag]);
  return (
    <div className="flex-col flex w-1/3" id="leftSection">
      <LeftUpperHeader />
      <div className="overflow-y-auto h-full">
        <div className="px-3 py-2">
          <input
            type="text"
            className="rounded-full w-full my-2 px-3 py-1 shadow-md"
            placeholder="search"
          />
        </div>
        <CreateMenu
          setShowStartMessage={setShowStartMessage}
          setShowCreateGroupForm={setShowCreateGroupForm}
        />
        {showStartMessage && (
          <StartConversation
            addRecipient={addRecipient}
            setShowStartMessage={setShowStartMessage}
          />
        )}
        {showCreateGroupForm && (
          <CreateGroupForm setShowCreateGroupForm={setShowCreateGroupForm} />
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
        {groups?.map((group) => {
          return (
            <ChatCardWrapper
              callback={() => setRightSide(group)}
              key={group._id}
            >
              {group.name}
            </ChatCardWrapper>
          );
        })}
      </div>
    </div>
  );
};
