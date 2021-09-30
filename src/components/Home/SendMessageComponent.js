import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useSocket } from "../../context/socket";

const emojis = require("emojis-list").slice(301);

export const SendMessageComponent = ({ recipient, isGroup }) => {
  const { user } = useAuth();
  const [showEmojis, setShowEmojis] = useState(false);
  const [message, setMessage] = useState("");
  const socket = useSocket();

  const saveMsgHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    socket.emit("saveMessage", {
      user: user,
      message: message,
    });
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

  const sendGroupMassageHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    socket.emit("sendGroupMessage", {
      sender: user,
      group: recipient,
      message: message,
    });
  };

  return (
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
          recipient === "saved"
            ? saveMsgHandler(e)
            : isGroup
            ? sendGroupMassageHandler(e)
            : sendHandler(e)
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
          className={`bg-white rounded-full whitespace-nowrap shadow-lg px-2 h-10 ml-3 ${
            message === "" ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <i className="fa fa-send text-lg mr-2"></i>Send
        </button>
      </form>
    </div>
  );
};
