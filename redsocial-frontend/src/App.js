import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <nav style={{ padding: "10px", backgroundColor: "#f8f9fa" }}>
        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/profile" style={{ marginRight: "10px" }}>Perfil</Link>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>Logout</button>
          </>
        )}
      </nav>

      <Routes>
        {/* Redirige a /profile si ya está logueado */}
        <Route path="/login" element={!isLoggedIn ? <LoginPage onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!isLoggedIn ? <RegisterPage /> : <Navigate to="/profile" />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
