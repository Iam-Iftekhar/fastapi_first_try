"use client";

import { useState } from "react";
import API from "../lib/api";

export default function LoginForm({ setUser }: { setUser: any }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    try {
      const res = await API.post(
        "/auth/jwt/login",
        new URLSearchParams({
          username: email,
          password: password,
        })
      );

      const token = res.data.access_token;
      localStorage.setItem("token", token);

      const userRes = await API.get("/users/me");
      setUser(userRes.data);
    } catch (err) {
      alert("Invalid email or password");
    }
  }

  async function register() {
    try {
      await API.post("/auth/register", {
        email,
        password,
      });
      alert("Account created. Now login.");
    } catch (err: any) {
      alert("Registration failed");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        className="w-full p-2 border rounded mb-2"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 border rounded mb-2"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-blue-600 text-white p-2 rounded mb-2" onClick={login}>
        Login
      </button>

      <button className="w-full bg-gray-600 text-white p-2 rounded" onClick={register}>
        Sign Up
      </button>
    </div>
  );
}
