function ProfilePage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card text-center shadow-sm">
            <img src="https://via.placeholder.com/150" 
            className="card-img-top rounded-circle mx-auto mt-3" alt="Foto de perfil"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">Nombre de Usuario</h5>
              <p className="card-text">Correo: usuario@mail.com</p>
              <p className="card-text">Biografía corta o descripción...</p>
              <button className="btn btn-primary">Editar perfil</button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default ProfilePage;