import React, { useState, useEffect } from "react";
import postService from "../services/postService";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";

function PostsPage() {
  const [posts, setPosts] = useState([]);


  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await postService.getPosts(token);
      setPosts(data);
    } catch (err) {
      console.error("Error al obtener posts:", err);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);


 return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">Inicio</h1>

      {/* Formulario de nueva publicación */}
      <PostForm onPostCreated={fetchPosts} />

      {/* Lista de posts */}
      <PostList posts={posts} />
    </div>
  );
}

/*
  const handleAddPost = async (newPost) => {
    try {
      const token = localStorage.getItem("token");
      const created = await postService.createPost(newPost, token);
      setPosts((prev) => [created, ...prev]); // lo agregamos al inicio
    } catch (err) {
      console.error("Error al crear post:", err);
    }
  };


  return (
    <div className="container mt-4">
      <h1 className="mb-4">Inicio</h1>


      <PostForm onSubmit={handleAddPost} />

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.user?.username || "Anónimo"}</h5>
              <p className="card-text">{post.content}</p>

              {post.imageUrl && (
                <img
                  src={`http://localhost:8080${post.imageUrl}`}
                  alt="post"
                  style={{ maxWidth: "300px", marginBottom: "10px" }}
                />
              )}

              <h6 className="mt-3">Comentarios</h6>
              <ul className="list-group mb-2">
                {(post.comments || []).map((c, i) => (
                  <li key={i} className="list-group-item">
                    {c}
                  </li>
                ))}
              </ul>

              <CommentForm
                onSubmit={(comment) =>
                  setPosts((prev) =>
                    prev.map((p) =>
                      p.id === post.id
                        ? { ...p, comments: [...(p.comments || []), comment] }
                        : p
                    )
                  )
                }
              />
            </div>
          </div>
        ))
      ) : (
        <p>No hay publicaciones aún. ¡Sé el primero en publicar algo!</p>
      )}
    </div>
  );
}

// 🔹 Formulario de nueva publicación
function PostForm({ onSubmit }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    onSubmit(formData);

    setContent("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-4 p-3 shadow-sm">
      <textarea
        className="form-control mb-2"
        placeholder="¿Qué estás pensando?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="file"
        className="form-control mb-2"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit" className="btn btn-primary">
        Publicar
      </button>
    </form>
  );
}

function CommentForm({ onSubmit }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Escribe un comentario..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn btn-sm btn-outline-primary">
        Enviar
      </button>
    </form>
  );
}
*/

export default PostsPage;
