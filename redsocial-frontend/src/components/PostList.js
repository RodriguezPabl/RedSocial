import { useState } from "react";

function PostList({posts}) {
  
 const [comments, setComments] = useState({});

  const handleAddComment = (postId, commentText) => {
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), commentText],
    }));
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-muted">No hay publicaciones aún.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">
                  @{post.user?.username || "Anónimo"}
                </h5>
                <small className="text-muted">
                  {new Date(post.createdAt).toLocaleString()}
                </small>
              </div>

              <p className="card-text">{post.content}</p>

              {post.imageUrl && (
                <div className="text-center">
                  <img
                    src={`http://localhost:8080${post.imageUrl}`}
                    alt="post"
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "300px", objectFit: "cover" }}
                  />
                </div>
              )}

              {/* Comentarios */}
              <div className="mt-3">
                <h6 className="fw-bold">Comentarios</h6>
                <ul className="list-group list-group-flush mb-2">
                  {(comments[post.id] || []).length > 0 ? (
                    comments[post.id].map((c, i) => (
                      <li key={i} className="list-group-item">
                        {c}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">
                      No hay comentarios todavía.
                    </li>
                  )}
                </ul>

                <CommentForm
                  onSubmit={(commentText) =>
                    handleAddComment(post.id, commentText)
                  }
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// 🔹 Formulario para agregar comentarios
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



export default PostList;