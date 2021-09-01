export const BASE_URL = "http://localhost:8080";

export function scrollBottom(id) {
  document.getElementById(id).scrollTop =
    document.getElementById(id).scrollHeight;
}
