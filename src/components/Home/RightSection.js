/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { useSocket } from "../../context/socket";
import { BASE_URL } from "../../utils/utils";
import { Spinner } from "../Spinner";

export const RightSection = ({ setRightSide, recipient }) => {
  const { user, setUser } = useAuth();
  const { removeRecipient } = useData();
  const headerTitle = recipient === "saved" ? "Saved Messages" : recipient.name;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const socket = useSocket();

  useEffect(async () => {
    if (recipient !== "saved") {
      setLoading(true);
      const {
        data: { messages: chats },
      } = await axios.post(`${BASE_URL}/messages/get_messages`, {
        userId: user._id,
        receiverId: recipient._id,
      });
      console.log(chats);
      setMessages(chats);
      setLoading(false);
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
    setMessages([...messages, msgObj]);
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
    socket.emit("sendMessage", {
      senderId: user._id,
      receiver: recipient,
      message: message,
    });
  };

  return (
    <div className="shadow-lg h-full flex flex-col">
      <div className="w-full px-3 py-2 shadow-md h-12 rounded-tr-md  bg-white font-medium">
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
            messages.map((msg) => {
              return (
                <div
                  key={msg.messageId}
                  className={`mb-3 w-min whitespace-nowrap py-2 px-3 rounded-3xl  shadow-xl  ${
                    msg.sender.name === user.name
                      ? "ml-auto bg-background text-white rounded-br-none"
                      : "text-black bg-white rounded-bl-none"
                  }`}
                >
                  {msg.message}
                </div>
              );
            })
          )
        ) : (
          messages.map((msg) => {
            return (
              <div
                key={msg.id}
                className="mb-3 ml-auto py-2 px-3 max-w-min rounded-3xl rounded-br-none shadow-xl bg-background text-white"
              >
                {msg.message}
              </div>
            );
          })
        )}
      </div>
      <div className=" flex bg-white w-full rounded-br-md">
        <form
          className="flex items-center py-2"
          onSubmit={(e) =>
            recipient === "saved" ? saveMsgHandler(e) : sendHandler(e)
          }
        >
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here"
            className=" max-h-40 rounded-md shadow-md bg-transparent py-1  px-4 w-500 ml-3 "
          />

          <button
            type="submit"
            className="rounded-full shadow-lg px-2 h-10 ml-3  "
          >
            <i className="fa fa-send text-lg mr-2"></i>Send
          </button>
        </form>
      </div>
    </div>
  );
};
