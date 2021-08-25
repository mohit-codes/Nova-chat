import React, { useState } from "react";
import {
  LeftUpperHeader,
  RightSection,
  SavedMessagesTile,
} from "../components/index";

export const Home = () => {
  const [rightSide, setRightSide] = useState(null);
  return (
    <div className="min-h-screen bg-background px-36 pt-14">
      <div className="mr-auto ml-auto flex h-600 w-full bg-gray-200 rounded-md">
        <div className="flex-col flex w-1/3 border-r-2 border-gray-400">
          <LeftUpperHeader />
          <div className="overflow-y-auto h-full">
            <SavedMessagesTile callback={() => setRightSide("saved")} />
          </div>
        </div>
        <div className="w-full h-full">
          {rightSide == null ? (
            <div className="flex bg-cyanShade h-full justify-center items-center">
              <p className="text-2xl text-white font-bold">Nova Chat</p>
            </div>
          ) : (
            <RightSection receiverId={rightSide} />
          )}
        </div>
      </div>
    </div>
  );
};
