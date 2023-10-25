import { Link, useNavigate } from 'react-router-dom';
import './styles/index.css';
import jwt_decode from "jwt-decode";

function Menu() {

  const navigate = useNavigate();

  function logout() {
    sessionStorage.removeItem('token');
    navigate("/");
  }



  const token = sessionStorage.getItem('token');
  // var tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
  // const rol = tokenDecoded.rol;
  // console.log(rol)




  if (token) {
    var decoded = jwt_decode(token);
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid ">
          <div className="container-fluid ">
            <a class="navbar-brand " href="/">
              <img src="./logo.png" class="logo" alt="Logo" width="50" height="50" />
            </a>
            <a className="navbar-brand letra" href="/">Leviatán Barber</a>
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
                <li className="nav-item">
                  {decoded.rol === "Admin"
                    ? <Link to="/horario" className="nav-link active letra">Horarios</Link>
                    : null
                  }

                </li>
              </ul>
            </div>
            <div className="mail"> {decoded.mail}</div>
           

            <button type="button" className='btn btn-danger' onClick={() => logout()}>
              <span className="material-symbols-outlined">
                logout
              </span>
            </button>

          </div>
        </nav>
      </>
    )
  } else {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid ">
          <div className="container-fluid ">
            <a class="navbar-brand " href="/">
              <img src="./logo.png" class="logo" alt="Logo" width="50" height="50" />
            </a>
            <a className="navbar-brand letra" href="/">Leviatán Barber</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link active letra">Inicio</Link>
                </li>
                {/* <li className="nav-item">
                  <Link to="/reservas" className="nav-link active letra">Reservas</Link>
                </li> */}
              </ul>
            </div>
            <ul className="nav justify-content-end boton">
              <li className="nav-item " >
                <Link to="/login" className="nav-link letra sesion">
                  <button type="button" className="btn btn-outline-primary ">Iniciar Sesión</button></Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link letra sesion">
                  <button className="btn btn-primary" type="submit">Registrase</button></Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    )
  }

}


export default Menu
