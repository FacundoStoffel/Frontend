import { Link } from 'react-router-dom';
import './styles/inicio.css';


export default function Inicio() {
    return (
        <>
            <h1 className="App-header">Bienvenidos a Leviatán Barber</h1>
            <h3>Donde el estilo y la elegancia se encuentran.</h3><br /><br /><br /><br />



            <div className="descrip">
            <p className="text">Ofrecemos cortes de cabello, afeitados, tratamientos de barba y mucho más.</p>
            
            <p className="text">Nuestro equipo de barberos profesionales está aquí para brindarte un servicio excepcional.</p>
            <p className="text">Programa tu cita en línea y elige la hora que mejor te convenga.</p>
            <p className="text sec">Si tienes cuenta inicia sesión <Link to="/login" className="link">aquí</Link> o <Link to="/register" className="link">registrate</Link></p>
            </div>
        </>
    );
};


// Nuestros Servicios: "Ofrecemos cortes de cabello, afeitados, tratamientos de barba y mucho más."

// Reserva en Línea: "Programa tu cita en línea y elige la hora que mejor te convenga."

// Nuestros Talentosos Barberos: "Nuestro equipo de barberos profesionales está aquí para
//brindarte un servicio excepcional."