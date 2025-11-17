"use client";

import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import Feed from "../components/Feed";
import API from "../lib/api";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("/users/me");
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
      }
    }

    load();
  }, []);

  return (
    <div className="p-6">
      {user ? <Feed user={user} /> : <LoginForm setUser={setUser} />}
    </div>
  );
}
