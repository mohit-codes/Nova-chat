import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/utils";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));
  const [token, setToken] = useState(
    JSON.parse(localStorage?.getItem("token"))
  );
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  axios.interceptors.response.use(undefined, function (error) {
    if (
      error?.response?.status === 401 ||
      error?.response?.status === 403 ||
      error?.response?.data?.message === "Invalid Token"
    ) {
      logout();
    }
    return Promise.reject(error);
  });

  async function loginWithUserCredentials(email, password) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
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
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
    }
    return { user, token, message };
  }

  function emailValidate(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
  }

  const logout = () => {
    axios.defaults.headers.common["Authorization"] = null;
    localStorage?.removeItem("user");
    localStorage?.removeItem("token");
    navigate("/", { replace: true });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithUserCredentials,
        emailValidate,
        signupWithUserCredentials,
        logout,
        setUser,
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
