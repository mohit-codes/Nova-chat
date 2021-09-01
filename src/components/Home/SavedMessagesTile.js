import React from "react";
import { ChatCardWrapper } from "./ChatCardWrapper";

export const SavedMessagesTile = ({ callback }) => {
  return (
    <ChatCardWrapper callback={callback}>
      <span className="rounded-full px-2 py-1 border-2 border-gray-400">
        <i className="far fa-bookmark"></i>
      </span>{" "}
      Saved Messages
    </ChatCardWrapper>
  );
};
