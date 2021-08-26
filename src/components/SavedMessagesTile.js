import React from "react";

export const SavedMessagesTile = ({ callback }) => {
  return (
    <div
      className="py-4 px-5 h-14 border-t-2 border-b-2 border-gray-200 cursor-pointer"
      onClick={callback}
    >
      <span className="rounded-full px-2 py-1 border-2 border-gray-400">
        <i className="far fa-bookmark"></i>
      </span>{" "}
      Saved Messages
    </div>
  );
};
