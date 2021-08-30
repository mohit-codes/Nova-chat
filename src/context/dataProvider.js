/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAxiosGet } from "../hooks/useAxiosGet";
import { BASE_URL } from "../utils/utils";
import { useAuth } from "./authProvider";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/users/recipients/${user._id}`);
      setRecipients(res.data.recipients);
      setLoading(false);
      setLoading(true);
      const secondResponse = await axios.get(
        `${BASE_URL}/users/recipients/${user._id}`
      );
      setGroups(secondResponse.data.groups);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  const addRecipient = (item) => {
    setRecipients((prevData) => [...prevData, item]);
    console.log(recipients);
  };

  const removeRecipient = (id) => {
    setRecipients((prevData) => prevData.filter((obj) => obj._id !== id));
  };
  // console.log(recipients);
  return (
    <DataContext.Provider
      value={{ recipients, addRecipient, groups, removeRecipient }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
