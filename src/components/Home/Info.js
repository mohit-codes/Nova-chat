import dayjs from "dayjs";
import { UpdateGroupInfoForm } from "./UpdateGroupInfoForm";
import { useAuth } from "../../context/authProvider";
import { GroupMembers } from "./GroupMembers";
import { useEffect } from "react";
import { axiosDelete } from "../../utils/utils";
import { useData } from "../../context/dataProvider";
import { navigate } from "@reach/router";

export const Info = ({ recipient, setShowRecipientDetails }) => {
  const { user } = useAuth();
  const isAdmin = recipient?.admin === user._id;
  const time = dayjs(recipient.createdAt).format("h.mm a");
  const date = dayjs(recipient.createdAt).format("DD/MM/YYYY");
  const isGroup = recipient?.groupCode ? true : false;
  const leftSection = document.getElementById("leftSection");
  const { removeGroup } = useData();
  const closeInfo = () => setShowRecipientDetails(false);
  useEffect(() => {
    leftSection.addEventListener("click", closeInfo);
    // cleanup
    return () => {
      leftSection.removeEventListener("click", closeInfo);
    };
  }, []);

  const deleteGroup = async () => {
    await axiosDelete("groups", recipient._id);
    removeGroup(recipient._id);
    navigate(-1);
  };

  return (
    <div className="absolute w-full h-screen md:h-full md:w-3/5 lg:static bg-back">
      <div className="relative z-10  flex items-center w-full px-3 justify-between shadow-md h-11 rounded-tr-md  bg-white font-medium">
        <span>Info</span>
        <i
          className="fa fa-close"
          onClick={() => setShowRecipientDetails(false)}
        ></i>
      </div>
      <div className="flex flex-col overflow-y-auto h-600">
        <div className="border-2 border-gray-200 mt-4 px-3 py-2 text-sm bg-white">
          <i className="far fa-calendar-alt mr-2"></i>
          <span>{`${
            isGroup ? "Created" : "Joined"
          } on ${date} at ${time}`}</span>
        </div>
        {isGroup && (
          <UpdateGroupInfoForm
            group={recipient}
            isAdmin={isAdmin}
            setShowRecipientDetails={setShowRecipientDetails}
          />
        )}
        {isGroup && <GroupMembers group={recipient} isAdmin={isAdmin} />}
        {isAdmin && (
          <div className="border-2 border-gray-200 mt-auto px-3 py-2">
            <div
              className="flex justify-between items-center text-red-600 cursor-pointer"
              onClick={() => deleteGroup()}
            >
              <span>Delete Group</span>
              <i className="fa fa-trash"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
