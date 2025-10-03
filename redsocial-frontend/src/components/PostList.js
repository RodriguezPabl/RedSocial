//import { useEffect, useState } from "react";
//import postService from "../services/postService";

function PostList({posts}) {
  /*
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
*/

  return (
    <div>
      {posts.length === 0 ? (
        <p>No hay publicaciones aún</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}
           style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}
           >
            <p><strong>{post.user?.username || "Anónimo"}</strong></p>
            <p>{post.content}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:8080${post.imageUrl}`}
                alt="post"
                style={{ maxWidth: "300px" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default PostList;