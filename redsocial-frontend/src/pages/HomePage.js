//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="mb-4">Bienvenido a RedSocial</h1>
      <p className="mb-5">Conéctate, comparte y descubre.</p>
      <div>
        <button onClick={goToLogin} className="btn btn-primary btn-lg m-2">
          Iniciar Sesión
        </button>
        <button onClick={goToRegister} className="btn btn-success btn-lg m-2">
          Registrarse
        </button>
      </div>
    </div>
  );
}

export default HomePage;