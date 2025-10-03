import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function LoginForm({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.login(username, password)
      .then((response) => {
        localStorage.setItem("token", response.token);
        //setMessage("Login exitoso");
        setIsLoggedIn(true);
        //onLogin();
        navigate("/posts");
      })
      .catch(() => {
        setMessage("Error en login");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default LoginForm;