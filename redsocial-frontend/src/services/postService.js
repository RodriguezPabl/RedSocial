import axios from "axios";

const API_URL = "http://localhost:8080/redsocial/posts";

// 🔹 Obtener todas las publicaciones
const getPosts = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 🔹 Crear una nueva publicación (texto e imagen)
const createPost = async (formData, token) => {
  const res = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // importante para subir imágenes
    },
  });
  return res.data;
};

export default {
  getPosts,
  createPost,
};