function ProfilePage() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Columna izquierda: info usuario */}
        <div className="col-md-4">
          <div className="card">
            <img
              src="https://via.placeholder.com/150"
              className="card-img-top"
              alt="Foto de perfil"
            />
            <div className="card-body">
              <h5 className="card-title">Nombre de Usuario</h5>
              <p className="card-text">Correo: usuario@mail.com</p>
              <p className="card-text">Biografía corta o descripción...</p>
              <button className="btn btn-primary">Editar perfil</button>
            </div>
          </div>
        </div>

        {/* Columna derecha: publicaciones */}
        <div className="col-md-8">
          <h3>Publicaciones</h3>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Título del post</h5>
              <p className="card-text">Contenido de la publicación...</p>
              <button className="btn btn-sm btn-outline-primary">Comentar</button>
            </div>
          </div>
          {/* acá después vas a mapear las publicaciones reales */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;