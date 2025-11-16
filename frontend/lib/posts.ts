// lib/posts.ts
import api from "./api";

export const fetchFeed = async () => {
  const res = await api.get("/feed");
  return res.data.posts;
};

export const uploadPost = async (
  file: File,
  caption: string,
  file_type: string,
  file_name: string
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("caption", caption);
  formData.append("file_type", file_type);
  formData.append("file_name", file_name);

  const res = await api.post("/upload", formData);
  return res.data;
};

export const deletePost = async (postId: string) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};
