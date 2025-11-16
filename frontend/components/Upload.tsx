"use client";

import { useState } from "react";
import api from "../../lib/api";

type UploadProps = {
  onUpload: () => void;   // <-- PROPS DEFINED HERE
};

export default function Upload({ onUpload }: UploadProps) {
  const [file, setFile] = useState<File | null>(null);

  async function handleUpload() {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    onUpload(); // Call parent reload
  }

  return (
    <div className="p-4 bg-gray-200 rounded">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-3 py-1"
      >
        Upload
      </button>
    </div>
  );
}
