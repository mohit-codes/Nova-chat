import React, { useState } from "react";
import { Input } from "../components/input";
import { useAuth } from "../context/authProvider";
import { Link, useNavigate } from "@reach/router";
import useDocumentTitle from "../hooks/useDocumentTitle";
export const Signup = () => {
  const navigate = useNavigate();
  const { signupWithUserCredentials, emailValidate } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useDocumentTitle("Sign up | Nova Chat");

  const matchPassword = confirmPassword === password && confirmPassword !== "";

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signupHandler = async (event) => {
    event.preventDefault();
    if (emailValidate(email)) {
      if (isPasswordValid) {
        if (matchPassword) {
          setLoading(true);
          const { user, message } = await signupWithUserCredentials(
            name,
            email,
            password
          );
          if (user !== null) {
            navigate("home", { replace: true });
            return;
          }
          setError(message);
          return;
        }
        setError("Both passwords must be same");
        return;
      }
      setError(
        "Password must be 8 characters long, have one upper and lower case character and one number."
      );
      return;
    }
    setError("Enter Valid Email");
  };

  return (
    <div className="min-h-screen pt-14 background-gif">
      <div className="text-center mr-auto ml-auto bg-white max-w-sm rounded-md">
        <div className="pt-7">
          <h1 className="md:text-5xl font-bold text-2xl">Nova Chat</h1>
        </div>
        <div className=" py-10 px-3 ">
          {error !== "" && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={(event) => signupHandler(event)}>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Name"
                value={name}
                callback={(e) => {
                  setError("");
                  setName(e.target.value);
                }}
              />
            </div>
            <div>
              <Input
                type="text"
                placeholder="Email"
                value={email}
                callback={(e) => {
                  setError("");
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="my-3 border-2 border-black w-72 py-2 px-3 text-left  rounded-md ml-9">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="outline-none"
                value={password}
                onChange={(e) => {
                  setError("");
                  setPassword(e.target.value);
                }}
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
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                callback={(e) => {
                  setError("");
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className={`mt-8  w-72 py-2 rounded-md text-white ${
                email === "" || password === "" || name === ""
                  ? "cursor-not-allowed bg-gray-500"
                  : "cursor-pointer bg-blue-800"
              }`}
              disabled={email === "" || password === "" || name === ""}
            >
              {loading ? "Signing Up..." : "Sign up"}
            </button>
          </form>
          <p className="my-3">OR</p>
          <Link to="/">
            <button className="border-2 border-background w-72 rounded-md h-10 hover:bg-background hover:text-white ">
              {" "}
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
