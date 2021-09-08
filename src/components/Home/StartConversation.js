/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { useSocket } from "../../context/socket";
import { BASE_URL } from "../../utils/utils";
export const StartConversation = ({ setShowStartMessage, addRecipient }) => {
  const socket = useSocket();
  const { user, emailValidate } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const startMessage = async (event) => {
    event.preventDefault();
    if (emailValidate(email)) {
      const {
        data: { status, user: recipient },
      } = await axios.get(`${BASE_URL}/users/get_by_email/${email}`);
      if (status) {
        socket.emit("startMessage", {
          senderId: user._id,
          receiverEmail: email,
          senderEmail: user.email,
        });
        addRecipient(recipient);
        setShowStartMessage(false);
        return;
      }
      setError("Recipient not found");
      return;
    }
    setError("enter valid email");
  };
  return (
    <div className="w-full px-2 mb-2">
      {error !== "" && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={(e) => startMessage(e)}>
        <input
          type="text"
          className="rounded-full w-full my-2 px-3 py-1 shadow-md"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <button
          type="submit"
          disabled={email === ""}
          className={`rounded-full px-3 py-1 shadow-md ${
            email !== "" ? "cursor-pointer" : "cursor-not-allowed"
          }`}
        >
          Start
        </button>
        <i
          onClick={() => setShowStartMessage(false)}
          className="fa fa-close ml-2"
        ></i>
      </form>
    </div>
  );
};
