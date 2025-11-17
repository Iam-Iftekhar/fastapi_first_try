"use client";

import { useEffect, useState } from "react";
import Upload from "../components/Upload";
import API from "../lib/api";

export default function Feed({ user }: { user: any }) {
  const [posts, setPosts] = useState<any[]>([]);

  async function loadFeed() {
    const res = await API.get("/feed");
    setPosts(res.data.posts);
  }

  async function deletePost(id: string) {
    await API.delete(`/posts/${id}`);
    loadFeed();
  }

  useEffect(() => {
    loadFeed();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      <Upload onUpload={loadFeed} />

      <div className="mt-6">
        {posts.length === 0 && <p>No posts yet.</p>}

        {posts.map((post) => (
          <div key={post.id} className="mb-6 border p-4 rounded">
            <div className="flex justify-between mb-2">
              <div>
                <b>{post.email}</b> • {post.created_at.slice(0, 10)}
              </div>

              {post.is_owner && (
                <button
                  className="text-red-600"
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </button>
              )}
            </div>

            {post.file_type === "image" ? (
              <img src={post.url} className="w-64 rounded" />
            ) : (
              <video src={post.url} className="w-64" controls />
            )}

            <p className="mt-2">{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
