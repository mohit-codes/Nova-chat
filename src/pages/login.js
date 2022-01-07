import React, { useState } from "react";
import { Input, PasswordField } from "../components/FormComponents";
import { useAuth } from "../context/authProvider";
import { Link, useNavigate } from "@reach/router";
import useDocumentTitle from "../hooks/useDocumentTitle";

export const Login = () => {
  const navigate = useNavigate();
  const { loginWithUserCredentials, emailValidate } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useDocumentTitle("Log In | Nova Chat");

  const loginHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (emailValidate(email)) {
      const { user, message } = await loginWithUserCredentials(email, password);
      if (user == null) {
        setError(message);
        setLoading(false);
        return;
      }
      navigate("home", { replace: true });
      return;
    }
    setError("Enter Valid Email");
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 background-gif">
      <div className="text-center mr-auto ml-auto bg-white max-w-sm rounded-md">
        <div className="pt-7">
          <h1 className="text-5xl font-bold ">Nova Chat </h1>
        </div>
        <div className=" py-10 px-3 shadow-lg">
          {error !== "" && <p className="text-red-600 mb-2">{error}</p>}
          <form onSubmit={(event) => loginHandler(event)} className="">
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
            <PasswordField
              value={password}
              callback={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className={`mt-8 w-full md:w-72 py-2 rounded-md text-white ${
                email === "" || password === ""
                  ? "cursor-not-allowed bg-gray-500"
                  : "cursor-pointer bg-blue-800"
              }`}
              disabled={email === "" || password === ""}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
            <button
              onClick={() => {
                setEmail("test@test.com");
                setPassword("Test@123");
              }}
              className="mt-2 w-full md:w-72 py-2 rounded-md text-white cursor-pointer bg-blue-800"
            >
              {"Use test credentials"}
            </button>
          </form>
          <p className="my-3">OR</p>
          <Link to="signup">
            <button className="border-2 border-background w-full md:w-72 rounded-md h-10 hover:bg-background hover:text-white ">
              {" "}
              Signup for an account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
