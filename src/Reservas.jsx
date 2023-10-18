import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import jwt_decode from "jwt-decode";

export class Reservas extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reservas: [],
      modal: false
    }
  };

  componentDidMount() {

    let parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }

    fetch("http://localhost:8080/reservas", parametros)

      .then(res => {
        return res.json()
          .then(body => {
            return {
              status: res.status,
              ok: res.ok,
              headers: res.headers,
              body: body
            };
          })
      }).then(

        result => {
          if (result.ok) {
            this.setState({
              reservas: result.body,
              modal: false
            });
          } else {
            toast.error(result.body.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      ).catch(
        (error) => { console.log(error) }
      );
  };


  convertirFecha = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  }



  render() {

    const reservas_list = this.state.reservas.map((reserva, index) => {

      return (
        <tr key={index}>
          <td>{this.convertirFecha(reserva.fecha)}</td>
          <td>{reserva.hora}</td>
          <td>{reserva.id_usuario}</td>
          <td>{reserva.id_corte}</td>
          <td>{reserva.id_pago}</td>
          <td>{reserva.cancelada}</td>
          <td>
            <Link to={`/reservas/edit/${reserva.id_reserva}`} className='btn btn-primary'>
              <span class="material-symbols-outlined">
                edit
              </span>
            </Link>
          </td>
        </tr>
      )
    });

    return (
      <>
        <h1>Reservas</h1>

        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Usuario</th>
              <th>Corte</th>
              <th>Pago</th>
              <th>Cancelada</th>
            </tr>
          </thead>
          <tbody>
            {reservas_list}
          </tbody>
        </table>
        <Link to={"/reservas/edit"} className='btn btn-primary'>Nueva Reserva</Link>
      </>
    )
  }
}

export default Reservas
