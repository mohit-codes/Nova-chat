import { useEffect, useState } from "react";
import {
  ChatCardWrapper,
  CreateMenu,
  LeftUpperHeader,
  SavedMessagesTile,
  StartConversation,
} from "../index";
import { useSocket } from "../../context/socket";
import { useData } from "../../context/dataProvider";
import { CreateGroupForm } from "./CreateGroupForm";
import { Spinner } from "../Spinner";

export const LeftSection = ({ setRightSide, setLeftSide }) => {
  const socket = useSocket();
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const { groups, recipients, addRecipient, loading } = useData();

  let flag = true;
  useEffect(() => {
    socket.on("newRecipient", (info) => {
      flag = !flag;
      if (recipients.findIndex((r) => r._id === info.sender._id) === -1) {
        addRecipient(info.sender);
      }
    });
  }, [flag]);
  return (
    <div className="flex-col flex w-1/2 lg:w-1/3" id="leftSection">
      <LeftUpperHeader setLeftSide={setLeftSide} />
      <div className="overflow-y-auto h-full">
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
        {loading ? (
          <div className="flex justify-center mt-2">
            <Spinner />
          </div>
        ) : (
          recipients?.map((recipient) => {
            return (
              <ChatCardWrapper
                callback={() => setRightSide(recipient)}
                key={recipient._id}
              >
                {recipient.name}
              </ChatCardWrapper>
            );
          })
        )}
        {groups?.map((group) => {
          return (
            <ChatCardWrapper
              callback={() => setRightSide(group)}
              key={group._id}
            >
              {group?.name}
            </ChatCardWrapper>
          );
        })}
      </div>
    </div>
  );
};
