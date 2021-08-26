/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authProvider";
import { BASE_URL } from "../utils/utils";

export const RightSection = ({ receiverId }) => {
  const { user, setUser } = useAuth();
  const headerTitle = receiverId === "saved" ? "Saved Messages" : receiverId;
  const [messages, setMessages] = useState(user.savedMessages);
  const [message, setMessage] = useState("");

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

  const sendHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="shadow-lg h-full flex flex-col">
      <div className="w-full px-3 py-2 shadow-md h-12 rounded-tr-md border-gray-400 bg-white font-medium">
        {headerTitle}
      </div>
      <div className="px-3 pt-3 h-full shadow-inner">
        {messages.map((msg) => {
          return (
            <div
              key={msg.id}
              className="mb-3 ml-auto py-2 px-3 max-w-min rounded-3xl rounded-br-none shadow-xl bg-background text-white"
            >
              {msg.message}
            </div>
          );
        })}
      </div>
      <div className=" flex bg-white w-full rounded-br-md">
        <form
          className="flex items-center py-2"
          onSubmit={(e) =>
            receiverId === "saved" ? saveMsgHandler(e) : sendHandler(e)
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
