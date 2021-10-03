/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/utils";

export const GroupMembers = ({ group, isAdmin }) => {
  const [members, setMembers] = useState([]);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(async () => {
    const { data } = await axios.get(
      `${BASE_URL}/groups/members/${group._id}`
    );
    setMembers(data.members);
  }, []);

  const addMemberEventHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BASE_URL}/groups/add_member`, {
      memberEmail: email,
      groupId: group._id,
    });
    if (!data.status) {
      setError(data.message);
      return;
    }
    setEmail("");
    setMembers((prevState) => [...prevState, data.memberInfo]);
  };
  return (
    <>
      {showAddMemberForm && (
        <div className="mt-4 px-3 py-2">
          {error !== "" && <p className="text-red-600">{error}</p>}
          <form onSubmit={(e) => addMemberEventHandler(e)}>
            <input
              type="text"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => {
                setError("");
                setEmail(e.target.value);
              }}
              className="rounded-full w-full mb-2 px-3 py-1 shadow-md"
            />
            <button
              type="submit"
              disabled={email === ""}
              className={`bg-white rounded-full px-3 py-1 shadow-md ${
                email !== "" ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
              Add
            </button>
            <i
              onClick={() => {
                setShowAddMemberForm(false);
              }}
              className="fa fa-close ml-2"
            ></i>
          </form>
        </div>
      )}
      <div className="">
        <div className="border-2 border-gray-200 mt-4 px-3 py-2">
          <div className="flex justify-between items-center">
            <span>Members</span>
            {isAdmin && (
              <i
                className="fa fa-user-plus"
                onClick={() => setShowAddMemberForm(true)}
              ></i>
            )}
          </div>
        </div>
        {members.map((member) => {
          return (
            <div className="px-3" key={member._id}>
              {member.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
