import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();       // limpia token y estado
    navigate("/");    // redirige a HomePage
  };  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand fw-bold" to="/posts">
        RedSocial
      </Link>

      <div className="collapse navbar-collapse justify-content-end">
        <div className="d-flex">
          <Link to="/posts" className="btn btn-outline-primary btn-sm me-2">
            Feed
          </Link>
          <Link to="/profile" className="btn btn-outline-secondary btn-sm me-2">
            Perfil
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;