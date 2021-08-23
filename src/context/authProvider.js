import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { BASE_URL } from "../utils/utils";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  async function loginWithUserCredentials(email, password) {
    const {
      data: { message, user, token, status },
    } = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: password,
    });
    if (status) {
      setUser(user);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithUserCredentials,
        emailValidate,
        signupWithUserCredentials,
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
