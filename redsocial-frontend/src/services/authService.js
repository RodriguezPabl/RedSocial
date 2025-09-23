import API from "../utils/axiosConfig";

const register = (username, password) => {
  return API.post(`${API}/register`, { username, password });
};

const login = (username, password) => {
  return API.post(`${API}/login`, { username, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;