import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { useSocket } from "../../context/socket";
import { Spinner } from "../Spinner";
import { ChatMenu } from "./ChatMenu";
import { Info } from "./Info";
import Message from "./Message";
import { SendMessageComponent } from "./SendMessageComponent";

export const RightSection = ({ setRightSide, recipient }) => {
  const { user } = useAuth();
  const {
    messagesLoading,
    messages,
    fetchMessages,
    addMessageCallback,
    fetchSavedMessages,
    messageDeleteHandler,
  } = useData();
  const headerTitle = recipient === "saved" ? "Saved Messages" : recipient.name;
  const [showMenu, setShowMenu] = useState(false);
  const [showRecipientDetails, setShowRecipientDetails] = useState(false);
  const isGroup = recipient?.groupCode ? true : false;
  const isAdmin = isGroup
    ? recipient?.admin === user._id
      ? true
      : false
    : true;
  const socket = useSocket();
  let date;

  useEffect(() => {
    socket.on("message", addMessageCallback);
    socket.on("groupMessage", addMessageCallback);
    socket.on("savedMessage", addMessageCallback);

    if (isGroup) {
      socket.emit("joinGroup", {
        userInfo: { name: user.name, _id: user._id, email: user.email },
        group: recipient,
      });
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      if (isGroup) {
        await fetchMessages(user._id, recipient._id, "get_group_messages");
      } else if (recipient !== "saved") {
        await fetchMessages(user._id, recipient._id, "get_messages");
      } else {
        await fetchSavedMessages(user._id);
      }
    };
    fetch();
  }, [recipient]);

  return (
    <div className="flex w-full h-full">
      <div className="shadow-lg h-full flex w-full flex-col">
        <div className=" z-10 w-full px-3 py-2 shadow-md h-12 rounded-tr-md  bg-white font-medium">
          {headerTitle}
          {recipient !== "saved" && (
            <i
              className="float-right fa fa-ellipsis-v mt-1"
              onClick={() => setShowMenu(!showMenu)}
            ></i>
          )}
          {showMenu && (
            <ChatMenu
              recipient={recipient}
              setShowRecipientDetails={setShowRecipientDetails}
              setShowMenu={setShowMenu}
              setRightSide={setRightSide}
            />
          )}
        </div>

        <div
          id="messages"
          className="overflow-y-auto px-5 pt-3 h-full shadow-inner"
        >
          {messagesLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            messages.map((msg, index) => {
              const currentDate = dayjs(msg.createdAt).format("DD-MM-YYYY");
              let showDate =
                index === 0 ? true : date === currentDate ? false : true;
              date =
                index === 0
                  ? currentDate
                  : date === currentDate
                  ? date
                  : currentDate;
              return (
                <div key={msg.messageId}>
                  {showDate && (
                    <p className="w-full flex justify-center mb-3">
                      <span className="shadow-lg rounded-full py-1 px-2 font-normal">
                        {date}
                      </span>
                    </p>
                  )}
                  <Message
                    msg={msg}
                    isAdmin={isAdmin}
                    isGroup={isGroup}
                    messageDeleteHandler={messageDeleteHandler}
                  />
                </div>
              );
            })
          )}
        </div>
        <SendMessageComponent recipient={recipient} isGroup={isGroup} />
      </div>
      {showRecipientDetails && (
        <Info
          recipient={recipient}
          setRightSide={setRightSide}
          setShowRecipientDetails={setShowRecipientDetails}
        />
      )}
    </div>
  );
};
