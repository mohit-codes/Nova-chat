import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/utils";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));

  async function loginWithUserCredentials(email, password) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
    }
    return { user, token, message };
  }
  async function signupWithUserCredentials(name, email, password) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/signup`, {
      name: name,
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
    }
    return { user, token, message };
  }

  function emailValidate(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  const logout = () => {
    navigate("/", { replace: true });
    localStorage.clear();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithUserCredentials,
        emailValidate,
        signupWithUserCredentials,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.element,
};
