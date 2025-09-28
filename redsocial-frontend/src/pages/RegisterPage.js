import RegisterForm from "../components/RegisterForm";

function RegisterPage({onRegister}) {
  return (
    <div>
      <h1>Página de Registro</h1>
      <RegisterForm onRegister={onRegister} />
    </div>
  );
}

export default RegisterPage;