import './index.css';

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid ">
        <div className="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="./logo.png" class="logo" alt="Logo" width="50" height="50" />
          </a>
          <a className="navbar-brand letra" href="/">Barberia</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active letra" aria-current="page" href="/">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link letra sesion" href="/">Iniciar Sesión</a>
              </li>
              <li className="nav-item">
                <a className="nav-link letra" href="/"> </a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled letra" aria-disabled="true" href="/"> </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};