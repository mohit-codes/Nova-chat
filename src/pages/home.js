import React, { useEffect, useState } from "react";
import { LeftSection } from "../components/index";
import { useAuth } from "../context/authProvider";
import { useSocket } from "../context/socket";
import { DataProvider } from "../context/dataProvider";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { Settings } from "../components/Home/Settings";

export const Home = (props) => {
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
            <LeftSection setLeftSide={setLeftSide} />
          )}
          {props.location.pathname === "/home" ? (
            <div className="hidden md:flex bg-cyanShade h-full justify-center rounded-r-md items-center w-full">
              <p className="text-2xl text-white font-bold animate-bounce">
                Nova Chat
              </p>
            </div>
          ) : (
            <div className="absolute md:static w-full lg:w-full h-full">
              {props.children}
            </div>
          )}
        </div>
      </div>
    </DataProvider>
  );
};
