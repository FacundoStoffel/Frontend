import { Link } from 'react-router-dom';
import './styles/index.css';

export default function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid ">
        <div className="container-fluid ">
          <a class="navbar-brand " href="/">
            <img src="./logo.png" class="logo" alt="Logo" width="50" height="50" />
          </a>
          <a className="navbar-brand letra" href="/">Barberia</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active letra">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/reservas" className="nav-link active letra">Reservas</Link>
              </li>
            </ul>
          </div>
          <ul className="nav justify-content-end boton">
            <li className="nav-item " >
              <Link to="/login" className="nav-link letra sesion">
                <button type="button" className="btn btn-outline-primary ">Iniciar Sesión</button></Link>
            </li>
            <li className="nav-item">
              <Link to="/registrar" className="nav-link letra sesion">
                <button className="btn btn-primary" type="submit">Registrase</button></Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};