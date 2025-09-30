import { useState } from "react";
import postService from "../services/postService";

function PostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      await postService.createPost(formData, token);
      setContent("");
      setImage(null);
      if (onPostCreated) onPostCreated(); // refresca lista
    } catch (err) {
      console.error("Error al crear post:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <textarea
        placeholder="¿Qué estás pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="3"
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br />
      <button type="submit">Publicar</button>
    </form>
  );
}

export default PostForm;