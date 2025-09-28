import LoginForm from "../components/LoginForm";

function LoginPage({ setIsLoggedIn }) {
  return (
    <div>
    <div className="container mt-5"></div>
      <h1>Página de Login</h1>
      <LoginForm setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default LoginPage;
