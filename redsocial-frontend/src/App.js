import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import PostsPage from "./pages/PostsPage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
  // revisa si hay token guardado
  return !!localStorage.getItem("token");
});

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  const Layout = ({ children }) => {
    const location = useLocation();

    const hideNavbar = ["/", "/login", "/register"].includes(location.pathname);

    return (
      <>
        {!hideNavbar && <Navbar onLogout={handleLogout} />}
        {children}
      </>
    );
  };

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Página de inicio */}
          <Route path="/" element={<HomePage />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <LoginPage setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/posts" />
              )
            }
          />

           {/* Register */}
          <Route
            path="/register"
            element={
              !isLoggedIn ? (
                <RegisterPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Posts (feed principal) */}
          <Route
            path="/posts"
            element={isLoggedIn ? <PostsPage /> : <Navigate to="/" />}
          />


           {/* Perfil */}
          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />}
          />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
