import LoginForm from "../components/LoginForm";

function LoginPage({ onLogin }) {
  return (
    <div>
    <div className="container mt-5"></div>
      <h1>Página de Login</h1>
      <LoginForm onLogin={onLogin} />
    </div>
  );
}

export default LoginPage;
