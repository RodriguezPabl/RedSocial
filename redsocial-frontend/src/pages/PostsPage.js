import React, { useState} from "react"
//import PostCard from "../components/PostCard";

function PostsPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Juan",
      content: "Hola, esta es mi primera publicación",
      comments: ["¡Bienvenido!", "Qué bueno leerte"],
    },
    {
      id: 2,
      user: "Roberto",
      content: "¡Buenos dias a todos!",
      comments: ["Gracias", "¡igual para vos!"],
    },
  ]);

  const addComment = (postId, comment) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Inicio</h1>

      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.user}</h5>
              <p className="card-text">{post.content}</p>

              <h6 className="mt-3">Comentarios</h6>
              <ul className="list-group mb-2">
                {post.comments.map((c, i) => (
                  <li key={i} className="list-group-item">
                    {c}
                  </li>
                ))}
              </ul>

    
              <CommentForm
                onSubmit={(comment) => addComment(post.id, comment)}
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

export default PostsPage;