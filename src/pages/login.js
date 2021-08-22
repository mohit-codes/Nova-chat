import React, { useState } from "react";
import { Input } from "../components/input";
import { useAuth } from "../context/authProvider";
export const Login = () => {
  const { loginWithUserCredentials } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (event) => {
    event.preventDefault();
    const { user, token, message } = await loginWithUserCredentials(
      email,
      password
    );
  };

  return (
    <div className="min-h-screen pt-28 background-gif">
      <div className="text-center mr-auto ml-auto bg-white max-w-sm rounded-md">
        <div className="pt-7">
          <h1 className="md:text-5xl font-bold text-2xl">Nova Chat</h1>
        </div>
        <div className=" py-10 px-3 ">
          <form onSubmit={(event) => loginHandler(event)} className="">
            <div>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                callback={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5 border-2 border-black w-72 py-2 px-3 text-left  rounded-md ml-9">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa fa-eye-slash ml-14 cursor-pointer"
                />
              ) : (
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className="fa fa-eye ml-14 cursor-pointer"
                />
              )}
            </div>
            <button
              type="submit"
              className="mt-8 bg-background w-40 py-2 rounded-md text-white"
            >
              Login
            </button>
            <p></p>
          </form>
        </div>
      </div>
    </div>
  );
};
