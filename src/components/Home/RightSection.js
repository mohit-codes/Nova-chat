/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useSocket } from "../../context/socket";
import {
  fetchChats,
  scrollBottom,
  axiosDelete,
  fetchSavedMessages,
  deleteSavedMessage,
  decryptMessage,
} from "../../utils/utils";
import { Spinner } from "../Spinner";
import { ChatMenu } from "./ChatMenu";
import { Info } from "./Info";
import { SendMessageComponent } from "./SendMessageComponent";

export const RightSection = ({ setRightSide, recipient }) => {
  const { user } = useAuth();
  const headerTitle = recipient === "saved" ? "Saved Messages" : recipient.name;
  const [messages, setMessages] = useState([]);
  const [showMessageOptions, setShowMessageOptions] = useState("");
  const [showMessageChevron, setShowMessageChevron] = useState("");
  const [loading, setLoading] = useState(false);
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
    socket.on("message", (info) => {
      setMessages((prevState) => [...prevState, info]);
      scrollBottom("messages");
    });
    socket.on("groupMessage", (info) => {
      setMessages((prevState) => [...prevState, info]);
      scrollBottom("messages");
    });
    socket.on("savedMessage", (info) => {
      setMessages((prevState) => [...prevState, info]);
      scrollBottom("messages");
    });
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
        setLoading(true);
        const chats = await fetchChats(
          user._id,
          recipient._id,
          "get_group_messages"
        );
        setMessages(chats);
        setLoading(false);
        scrollBottom("messages");
      } else if (recipient !== "saved") {
        setLoading(true);
        const chats = await fetchChats(user._id, recipient._id, "get_messages");
        setMessages(chats);
        setLoading(false);
        scrollBottom("messages");
      } else {
        setLoading(true);
        const savedMessages = await fetchSavedMessages(user._id);
        setMessages(savedMessages);
        setLoading(false);
      }
    };
    fetch();
  }, [recipient]);

  const messageDeleteHandler = async (id) => {
    setMessages((prevState) => prevState.filter((msg) => msg.messageId !== id));
    if (recipient !== "saved") {
      await axiosDelete("messages", id);
    } else {
      await deleteSavedMessage(user, id);
    }
  };

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
          onClick={() => setShowMessageOptions(false)}
        >
          {loading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            messages.map((msg, index) => {
              const time = dayjs(msg.createdAt).format("h.mm a");
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
                    <p className="w-full flex justify-center">
                      <span className="shadow-lg rounded-full py-1 px-2 font-normal">
                        {date}
                      </span>
                    </p>
                  )}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    onMouseEnter={() => setShowMessageChevron(msg.messageId)}
                    onMouseLeave={() => setShowMessageChevron("")}
                    className={`mb-3 w-min whitespace-nowrap py-2  px-3 rounded-3xl relative shadow-xl  ${
                      msg?.sender?.name === user.name
                        ? "ml-auto bg-background text-white rounded-br-none"
                        : "text-black bg-white rounded-bl-none"
                    }`}
                  >
                    {isGroup && (
                      <p className="font-medium">
                        {msg?.sender?.name !== user.name && msg?.sender?.name}
                      </p>
                    )}
                    {showMessageOptions === msg.messageId && isAdmin && (
                      <div className="absolute bg-gray-700 text-gray-300 right-0 -top-8 rounded-full">
                        <button
                          className="px-2 py-1"
                          onClick={() => messageDeleteHandler(msg.messageId)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    <div className="flex justify-between items-end">
                      {showMessageChevron === msg.messageId && (
                        <i
                          className="fa fa-chevron-down absolute right-4 top-1"
                          onClick={() => setShowMessageOptions(msg.messageId)}
                        ></i>
                      )}
                      {
                        <span className="mr-2">
                          {decryptMessage(msg.key, msg.message, msg.iv)}
                        </span>
                      }
                      <span className="text-exs ">{time}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <SendMessageComponent
          setMessages={setMessages}
          messages={messages}
          recipient={recipient}
          isGroup={isGroup}
        />
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
