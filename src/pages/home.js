import React, { useEffect, useState } from "react";
import { LeftSection, RightSection } from "../components/index";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/socket";
import { DataProvider } from "../context/dataProvider";
export const Home = () => {
  const [rightSide, setRightSide] = useState(null);
  const { user } = useAuth();
  const socket = useSocket();
  useEffect(() => {
    socket.emit("connectUser", { name: user.name });
  }, []);
  return (
    <DataProvider>
      <div className="min-h-screen bg-background px-36 pt-14">
        <div className="mr-auto ml-auto flex h-600 w-full bg-back rounded-md">
          <LeftSection setRightSide={setRightSide} />
          <div className="w-full h-full">
            {rightSide == null ? (
              <div className="flex bg-cyanShade h-full justify-center rounded-r-md items-center">
                <p className="text-2xl text-white font-bold">Nova Chat</p>
              </div>
            ) : (
              <RightSection setRightSide={setRightSide} recipient={rightSide} />
            )}
          </div>
        </div>
      </div>
    </DataProvider>
  );
};
