import React, { useState } from "react";
import { Input, PasswordField } from "../components/FormComponents";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useDocumentTitle("Sign up | Nova Chat");

  const matchPassword = confirmPassword === password && confirmPassword !== "";
  const isEmptyFields =
    !email.trim().length || !password.trim().length || !name.trim().length;

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
          <h1 className="text-5xl font-bold">Nova Chat</h1>
        </div>
        <div className="py-10 px-3">
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
            <PasswordField
              value={password}
              callback={(e) => {
                setError("");
                setPassword(e.target.value);
              }}
            />
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
              className="mt-8 w-full md:w-72 py-2 rounded-md text-white bg-blue-800"
              disabled={isEmptyFields}
            >
              {loading ? "Signing Up..." : "Sign up"}
            </button>
          </form>
          <p className="my-3">OR</p>
          <Link to="/">
            <button className="border-2 border-background w-full md:w-72 rounded-md h-10 hover:bg-background hover:text-white ">
              {" "}
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
