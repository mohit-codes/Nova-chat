import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  BASE_URL,
  fetchChats,
  scrollBottom,
  axiosDelete,
  deleteSavedMessage,
} from "../utils/utils";
import { useAuth } from "./authProvider";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [recipients, setRecipients] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

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
    if (recipients.findIndex((r) => r._id === item.sender._id) === -1) {
      setRecipients((prevData) => [...prevData, item]);
    }
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

  const fetchMessages = async (userId, recipientId, endpoint) => {
    setMessagesLoading(true);
    const chats = await fetchChats(userId, recipientId, endpoint);
    setMessages(chats);
    setMessagesLoading(false);
    scrollBottom("messages");
  };

  const addMessageCallback = (info) => {
    setMessages((prevState) => [...prevState, info]);
    scrollBottom("messages");
  };

  const fetchSavedMessages = async (id) => {
    setMessagesLoading(true);
    const { data } = await axios.get(`${BASE_URL}/users/savedMessages/${id}`);
    setMessages(data.savedMessages);
    setMessagesLoading(false);
  };

  const messageDeleteHandler = async (msg) => {
    const id = msg.messageId;
    const isItSavedMessage = msg.sender ? false : true;
    setMessages((prevState) => prevState.filter((msg) => msg.messageId !== id));
    if (!isItSavedMessage) {
      await axiosDelete("messages", id);
    } else {
      await deleteSavedMessage(user, id);
    }
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
        fetchMessages,
        messagesLoading,
        messages,
        addMessageCallback,
        fetchSavedMessages,
        messageDeleteHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
