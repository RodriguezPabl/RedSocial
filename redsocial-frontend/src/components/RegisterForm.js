import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authService.register(username, password)
      .then(() => {
        setMessage("Usuario registrado");
        //onRegister();
        navigate("/login");
      })
      .catch(() => {
        setMessage("Error en registro");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
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
      <button type="submit">Registrarse</button>
      <p>{message}</p>
    </form>
  );
}

export default RegisterForm;
