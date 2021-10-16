import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../utils/utils";
import { useAuth } from "./authProvider";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/users/recipients/${user._id}`);
        setRecipients(res.data.recipients);
        setLoading(false);
        setLoading(true);
        const secondResponse = await axios.get(
          `${BASE_URL}/users/groups/${user._id}`
        );
        setGroups(secondResponse.data.groups);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const addRecipient = (item) => {
    setRecipients((prevData) => [...prevData, item]);
  };

  const removeRecipient = (id) => {
    setRecipients((prevData) => prevData.filter((obj) => obj._id !== id));
  };

  const addGroup = (item) => {
    setGroups((prevData) => [...prevData, item]);
  };

  const updateGroup = (id, name, description, isPublic) => {
    function callback(obj) {
      if (obj._id === id) {
        obj.name = name;
        obj.description = description;
        obj.isPublic = isPublic;
      }
      return obj;
    }
    setGroups((prevState) => prevState.map(callback));
  };
  const removeGroup = (id) => {
    setGroups((prevData) => prevData.filter((obj) => obj._id !== id));
  };
  return (
    <DataContext.Provider
      value={{
        loading,
        recipients,
        addRecipient,
        updateGroup,
        groups,
        addGroup,
        removeGroup,
        removeRecipient,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
