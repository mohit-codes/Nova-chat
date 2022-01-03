import axios from "axios";
import crypto from "crypto-js";
export const BASE_URL = "https://nova-chat-backend.herokuapp.com";

export function scrollBottom(id) {
  document.getElementById(id).scrollTop =
    document.getElementById(id).scrollHeight;
}

export async function fetchChats(userId, recipientId, endPoint) {
  const data = {
    userId: userId,
  };
  Object.assign(
    data,
    endPoint === "get_messages"
      ? { receiverId: recipientId }
      : { groupId: recipientId }
  );
  const {
    data: { messages: chats },
  } = await axios.post(`${BASE_URL}/messages/${endPoint}`, data);
  return chats;
}

export async function deleteSavedMessage(user, id) {
  const { data: response } = await axios.delete(
    `${BASE_URL}/users/delete_saved_message`,
    { data: { userId: user._id, messageId: id } }
  );
  return response;
}

export async function axiosDelete(endpoint, id) {
  const { data: response } = await axios.delete(
    `${BASE_URL}/${endpoint}/${id}`
  );
  return response;
}

export const decryptMessage = (key, message, iv) => {
  let _key = crypto.enc.Hex.parse(key);
  const result = crypto.AES.decrypt(message, _key, {
    iv: crypto.enc.Hex.parse(iv),
    mode: crypto.mode.CBC,
    format: crypto.format.Hex,
  }).toString(crypto.enc.Utf8);
  return result;
};
