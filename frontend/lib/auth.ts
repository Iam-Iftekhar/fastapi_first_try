// lib/auth.ts
import api, { setAuthToken } from "./api";

export const login = async (email: string, password: string) => {
  const res = await api.post("/auth/jwt/login", {
    username: email,
    password,
  });
  const token = res.data.access_token;
  setAuthToken(token);
  return token;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};

export const signup = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};
