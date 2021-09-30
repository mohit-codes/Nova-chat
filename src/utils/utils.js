import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export function scrollBottom(id) {
  document.getElementById(id).scrollTop =
    document.getElementById(id).scrollHeight;
}

export async function fetchSavedMessages(id) {
  const {
    data: { savedMessages: savedMessages },
  } = await axios.get(`${BASE_URL}/users/savedMessages/${id}`);
  return savedMessages;
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

export async function axiosDelete(endpoint, id) {
  const { data: response } = await axios.delete(
    `${BASE_URL}/${endpoint}/${id}`
  );
  return response;
}
