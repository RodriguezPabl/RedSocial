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



export default PostsPage;
