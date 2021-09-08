import axios from "axios";

export const BASE_URL = "http://localhost:8080";

export function scrollBottom(id) {
  document.getElementById(id).scrollTop =
    document.getElementById(id).scrollHeight;
}

export async function fetchChats(userId, recipientId) {
  const {
    data: { messages: chats },
  } = await axios.post(`${BASE_URL}/messages/get_messages`, {
    userId: userId,
    receiverId: recipientId,
  });
  return chats;
}

export async function deleteUser(userId) {
  const { data: response } = await axios.delete(`${BASE_URL}/users/${userId}`);
  return response;
}
