/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authProvider";
import { BASE_URL } from "../utils/utils";

export const RightSection = ({ receiverId }) => {
  const { user, setUser } = useAuth();
  console.log(user);
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
    <div className="h-full flex flex-col">
      <div className="w-full px-3 py-2  border-b-2 h-11 border-gray-400">
        {headerTitle}
      </div>
      <div className="">
        {messages.map((msg) => {
          return (
            <div
              key={msg.id}
              className="border-2 border-gray-400 p-2 max-w-min rounded-md ml-2"
            >
              {msg.message}
            </div>
          );
        })}
      </div>
      <div className="mt-auto flex border-t-2 border-gray-400 w-full py-1">
        <form
          onSubmit={(e) =>
            receiverId === "saved" ? saveMsgHandler(e) : sendHandler(e)
          }
        >
          <textarea
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-2 max-h-40 rounded-lg border-gray-400 bg-transparent px-2 w-500 ml-3"
          />

          <button
            type="submit"
            className="rounded-full w-10 h-10 border-2 border-gray-400 ml-3  bg-cyanShade"
          >
            <i className="fa fa-send "></i>
          </button>
        </form>
      </div>
    </div>
  );
};
