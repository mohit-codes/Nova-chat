import React, { useEffect, useState } from "react";
import { LeftSection, RightSection } from "../components/index";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/socket";
import { DataProvider } from "../context/dataProvider";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Settings } from "../components/Home/Settings";

export const Home = () => {
  const [rightSide, setRightSide] = useState(null);
  const [leftSide, setLeftSide] = useState(false);
  const { user } = useAuth();
  const socket = useSocket();
  useDocumentTitle("Nova Chat");

  useEffect(() => {
    socket.emit("connectUser", { name: user.name });
  }, []);
  return (
    <DataProvider>
      <div className="min-h-screen bg-background lg:px-36 lg:pt-14">
        <div className="mr-auto ml-auto flex h-screen lg:h-600 w-full bg-back rounded-md">
          {leftSide ? (
            <Settings setLeftSide={setLeftSide} />
          ) : (
            <LeftSection
              setLeftSide={setLeftSide}
              setRightSide={setRightSide}
            />
          )}
          <div className="w-full h-full">
            {rightSide == null ? (
              <div className="flex bg-cyanShade h-full justify-center rounded-r-md items-center">
                <p className="text-2xl text-white font-bold animate-bounce">
                  Nova Chat
                </p>
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
