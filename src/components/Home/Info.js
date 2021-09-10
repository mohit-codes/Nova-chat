import dayjs from "dayjs";
import { UpdateGroupInfoForm } from "./UpdateGroupInfoForm";
import { useAuth } from "../../context/authProvider";
import { GroupMembers } from "./GroupMembers";

export const Info = ({ recipient, setShowRecipientDetails }) => {
  const { user } = useAuth();
  const isAdmin = recipient?.admin === user._id;
  const time = dayjs(recipient.createdAt).format("h.mm a");
  const date = dayjs(recipient.createdAt).format("DD/MM/YYYY");

  return (
    <div className="w-1/2">
      <div className=" z-10 flex items-center w-full px-3 justify-between shadow-md h-11 rounded-tr-md  bg-white font-medium">
        <span>Info</span>
        <i
          className="fa fa-close"
          onClick={() => setShowRecipientDetails(false)}
        ></i>
      </div>
      <div className="overflow-y-auto h-550">
        <div className="border-2 border-gray-200 mt-4 px-3 py-2 text-sm">
          <i className="far fa-calendar-alt"></i>
          <span>{` Created on ${date} at ${time}`}</span>
        </div>
        <UpdateGroupInfoForm group={recipient} isAdmin={isAdmin} />
        <GroupMembers group={recipient} isAdmin={isAdmin} />
        {isAdmin && (
          <div className="border-2 border-gray-200 mt-4 px-3 py-2">
            <div className="flex justify-between items-center text-red-600">
              <span>Delete Group</span>
              <i className="fa fa-trash"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
