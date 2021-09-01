/* eslint-disable no-unused-vars */
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { useSocket } from "../../context/socket";
import { BASE_URL, scrollBottom } from "../../utils/utils";
import { Spinner } from "../Spinner";
const emojis = require("emojis-list").slice(301);

export const RightSection = ({ setRightSide, recipient }) => {
  const { user, setUser } = useAuth();
  const { removeRecipient } = useData();
  const headerTitle = recipient === "saved" ? "Saved Messages" : recipient.name;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const socket = useSocket();
  let date;
  useEffect(() => {
    socket.on("message", (info) => {
      setMessages((prevState) => [...prevState, info]);
      scrollBottom("messages");
    });
  }, []);
  useEffect(async () => {
    if (recipient !== "saved") {
      setLoading(true);
      const {
        data: { messages: chats },
      } = await axios.post(`${BASE_URL}/messages/get_messages`, {
        userId: user._id,
        receiverId: recipient._id,
      });
      setMessages(chats);
      setLoading(false);
      scrollBottom("messages");
    } else {
      setMessages(user.savedMessages);
    }
  }, [recipient]);

  const saveMsgHandler = async (e) => {
    e.preventDefault();
    const msgObj = {
      id: messages.length + 1,
      message: message,
    };
    setMessages((prevState) => [...prevState, msgObj]);
    setUser({ ...user, savedMessages: [...messages, msgObj] });
    setMessage("");
    const res = await axios.post(`${BASE_URL}/users/saveMessage`, {
      userId: user._id,
      message: msgObj,
    });
    console.log(res);
  };

  const deleteChatHandler = async () => {
    const res = await axios.delete(`${BASE_URL}/users/deleteRecipient`, {
      data: {
        senderId: user._id,
        recipientId: recipient._id,
      },
    });
    removeRecipient(recipient._id);
    setRightSide(null);
  };

  const sendHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    socket.emit("sendMessage", {
      sender: user,
      receiver: recipient,
      message: message,
    });
  };
  return (
    <div className="shadow-lg h-full flex flex-col">
      <div className=" z-10 w-full px-3 py-2 shadow-md h-12 rounded-tr-md  bg-white font-medium">
        {headerTitle}
        {recipient !== "saved" && (
          <i
            className="float-right fa fa-ellipsis-v"
            onClick={() => setShowMenu(!showMenu)}
          ></i>
        )}
        {showMenu && (
          <div className="lg:fixed lg:right-40 bg-background  text-white rounded-md">
            <button
              className="border-t-2 border-b-2 border-gray-300 py-1 px-2"
              onClick={() => deleteChatHandler()}
            >
              Delete Chat
            </button>
          </div>
        )}
      </div>

      <div
        id="messages"
        className="overflow-y-auto px-3 pt-3 h-full shadow-inner"
      >
        {recipient !== "saved" ? (
          loading ? (
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
                    className={`mb-3 w-min whitespace-nowrap py-2 px-3 rounded-3xl  shadow-xl  ${
                      msg.sender.name === user.name
                        ? "ml-auto bg-background text-white rounded-br-none"
                        : "text-black bg-white rounded-bl-none"
                    }`}
                  >
                    <span className="mr-2">{msg.message}</span>{" "}
                    <span className="text-exs">{time}</span>
                  </div>
                </div>
              );
            })
          )
        ) : (
          messages.map((msg) => {
            const time = dayjs(msg.createdAt).format("h.mm a");
            return (
              <div
                key={msg.id}
                className="mb-3 whitespace-nowrap ml-auto py-2 px-3 w-min rounded-3xl rounded-br-none shadow-xl bg-background text-white"
              >
                <span className="mr-2">{msg.message}</span>{" "}
                <span className="text-exs">{time}</span>
              </div>
            );
          })
        )}
      </div>
      <div className="relative flex bg-white w-full rounded-br-md justify-end px-5">
        <button onClick={() => setShowEmojis(!showEmojis)}>
          <i className="far fa-smile text-xl"></i>
        </button>
        {showEmojis && (
          <div
            className="absolute
           bg-back flex flex-wrap left-0 -top-52 overflow-y-auto w-96 h-52"
          >
            {emojis.map((emoji, index) => {
              return (
                <div
                  className="p-1 cursor-pointer"
                  key={index}
                  onClick={() => setMessage(message + " " + emoji)}
                >
                  {emoji}
                </div>
              );
            })}
          </div>
        )}
        <form
          className="flex items-center py-2 w-full"
          onSubmit={(e) =>
            recipient === "saved" ? saveMsgHandler(e) : sendHandler(e)
          }
        >
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className=" max-h-40 rounded-md shadow-md bg-transparent py-1  px-4 w-full ml-3 "
          />

          <button
            type="submit"
            disabled={message === ""}
            className={`rounded-full whitespace-nowrap shadow-lg px-2 h-10 ml-3 ${
              message === "" ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <i className="fa fa-send text-lg mr-2"></i>Send
          </button>
        </form>
      </div>
    </div>
  );
};
