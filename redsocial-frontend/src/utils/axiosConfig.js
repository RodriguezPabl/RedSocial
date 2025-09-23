import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/redsocial/auth",
});

// Interceptor para agregar el token a cada request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
