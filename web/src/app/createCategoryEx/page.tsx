"use client";

import { useEffect, useState } from "react";
export default function CreateCategory() {
  const [formCategories, setFormCategories] = useState<{
    name: string;
    image: File | null;
  }>();

  async function getCategories() {
    try {
      const formData = new FormData();

      formData.append("name", formCategories?.name);
      formData.append("image", formCategories?.image);

      await fetch("http://localhost:8000/api/v1/categories", {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getCategories();
      }}
    >
      <input
        type="text"
        value={formCategories?.name}
        onChange={(e) => {
          setFormCategories((prev) => ({ ...prev, name: e.target.value }));
        }}
      />
      <input
        type="file"
        name=""
        id=""
        onChange={(e) => {
          setFormCategories((prev) => ({ ...prev, image: e.target.files[0] }));
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
