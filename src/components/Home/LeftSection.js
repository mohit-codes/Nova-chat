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
import { Link } from "@reach/router";

export const LeftSection = ({ setLeftSide }) => {
  const socket = useSocket((state) => state.socket);
  const [showStartMessage, setShowStartMessage] = useState(false);
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const { groups, recipients, addRecipient, loading } = useData();

  useEffect(() => {
    socket.on("newRecipient", (info) => {
      addRecipient(info.sender);
    });

    return () => {
      socket.off("newRecipient", (info) => {
        addRecipient(info.sender);
      });
    };
  }, []);

  return (
    <div className="flex-col flex w-full md:w-2/3 lg:w-1/3" id="leftSection">
      <LeftUpperHeader setLeftSide={setLeftSide} />
      <div className="overflow-y-auto h-full">
        <CreateMenu
          setShowStartMessage={setShowStartMessage}
          setShowCreateGroupForm={setShowCreateGroupForm}
        />
        {showStartMessage && (
          <StartConversation setShowStartMessage={setShowStartMessage} />
        )}
        {showCreateGroupForm && (
          <CreateGroupForm setShowCreateGroupForm={setShowCreateGroupForm} />
        )}
        <SavedMessagesTile />
        {loading ? (
          <div className="flex justify-center mt-2">
            <Spinner />
          </div>
        ) : (
          recipients?.map((recipient) => {
            return (
              <Link to={recipient._id} key={recipient._id} state={recipient}>
                <ChatCardWrapper>{recipient.name}</ChatCardWrapper>
              </Link>
            );
          })
        )}
        {groups?.map((group) => {
          return (
            <Link to={group._id} key={group._id} state={group}>
              <ChatCardWrapper>{group?.name}</ChatCardWrapper>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
