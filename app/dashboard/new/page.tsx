"use client";
import { uploadProductImage } from "@/lib/uploadProductImage";
import React, { useState } from "react";

export default function AddProductPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadProductImage(image);
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        desc,
        image: imageUrl,
      }),
    });

    if (response.ok) {
      alert("Product Added Seccessfully!");
      setTitle("");
      setDesc("");
      setImage(null);
    } else {
      alert("Failed To Add Product");
    }
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          placeholder="تصویر محصول رو آپلود کن."
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <input
          name="name"
          type="text"
          placeholder="نام محصول"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="desc"
          type="text"
          placeholder="توضیحات محصول"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">افزودن قاب جدید</button>
      </form>
    </div>
  );
}
