/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../../context/authProvider";
import { useData } from "../../context/dataProvider";
import { BASE_URL } from "../../utils/utils";

export const ChatMenu = ({
  recipient,
  setShowRecipientDetails,
  setShowMenu,
  setRightSide,
}) => {
  const { user } = useAuth();
  const { removeRecipient } = useData();
  const isGroup = recipient?.groupCode ? true : false;
  const closeMenu = () => setShowMenu(false);
  useEffect(() => {
    window.addEventListener("click", closeMenu);
    // cleanup
    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

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

  return (
    <div className="max-w-min ml-auto whitespace-nowrap bg-background text-sm z-20 text-white rounded-md cursor-pointer">
      <div
        className="py-1 px-2 "
        onClick={() => {
          setShowRecipientDetails(true);
          setShowMenu(false);
        }}
      >
        Show Info
      </div>
      {isGroup ? (
        <div className="py-1 px-2" onClick={() => deleteChatHandler()}>
          Leave group
        </div>
      ) : (
        <div className="py-1 px-2" onClick={() => deleteChatHandler()}>
          Delete Chat
        </div>
      )}
    </div>
  );
};
