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

  return (
    <AuthContext.Provider value={{ user, loginWithUserCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.element,
};
