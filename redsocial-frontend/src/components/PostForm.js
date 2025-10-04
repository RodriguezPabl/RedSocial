import { useState } from "react";
import postService from "../services/postService";

function PostForm({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await postService.createPost(formData, token);
      setContent("");
      setImage(null);
      if (onPostCreated) onPostCreated(); // refresca lista
    } catch (err) {
      console.error("Error al crear post:", err);
      alert("Ocurrio un error al publicar. Intenta de nuevo");
    }finally{
      setLoading(false);
    }
  };

  /*
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
*/

return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">Crear publicación</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="¿Qué estás pensando?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              disabled={loading}
            />
          </div>

          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </div>
    </div>
  );

}

export default PostForm;