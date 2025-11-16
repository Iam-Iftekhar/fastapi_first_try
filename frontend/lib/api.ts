import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:8000",
});

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem("token", token);
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete API.defaults.headers.common["Authorization"];
  }
}

// Auto-add token if exists (browser only)
if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default API;
