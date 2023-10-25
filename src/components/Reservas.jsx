import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom'
import './../styles/reservas.css';
// import jwt_decode from "jwt-decode";

export class InternalReservas extends Component {

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

  handleClickCancelar = () => {
    let parametros = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }
    const url = `http://localhost:8080/reservas/cancelar/${this.state.idToDelete}`
    fetch(url, parametros)
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
            toast.success(result.body.message, this.configTosti);
            this.componentDidMount();
          } else {
            toast.error(result.body.message, this.configTosti);
          }
        }
      ).catch(
        (error) => { console.log(error) }
      );
  }


  handleClickFinalizar = (id_reserva) => {
    let parametros = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authorization': sessionStorage.getItem('token')
      }
    }
    const url = `http://localhost:8080/reservas/delete/${id_reserva}`
    fetch(url, parametros)
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
            toast.success(result.body.message, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            this.componentDidMount();
            this.props.navigate("/reservas")
            window.location.reload();
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

  }


  convertirFecha = (date) => {
    const fecha = new Date(date);
    const dia = fecha.getUTCDate().toString().padStart(2, '0');
    const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  showModal = (id_reserva) => {
    this.setState({
      modal: true,
      idToDelete: id_reserva
    })

  }

  closeModal = () => {
    this.setState({
      modal: false,
      idToDelete: null
    })
  }



  render() {

    const reservas_list = this.state.reservas.map((reserva, index) => {

      return (
        <tr key={index}>
          <td>{this.convertirFecha(reserva.fecha)}</td>
          <td>{reserva.hora}</td>
          <td>{reserva.nombre_completo}</td>
          <td>{reserva.corte_tipo}</td>
          <td>{reserva.metodo}</td>

          {/* <td>{reserva.cancelada}</td> */}
          <td>
            <Link to={`/reservas/edit/${reserva.id_reserva}`} className='btn btn-primary'>
              <span className="material-symbols-outlined">
                edit
              </span>
            </Link>
            <button className='btn btn-outline-danger' onClick={() => this.showModal(reserva.id_reserva)}>
              <span className="material-symbols-outlined">
                cancel
              </span>
            </button>
            <button className='btn btn-outline-success' onClick={() => this.handleClickFinalizar(reserva.id_reserva)} >
              <span className="material-symbols-outlined">
                done
              </span>
            </button>
          </td>
        </tr>
      )
    });

    return (
      <>
        <h1>Reservas</h1>
        <div className="tabla rounded-table">
          <table className='table table-striped ' id="tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Usuario</th>
                <th>Servicio</th>
                <th>Pago</th>
                <th></th>
                {/* <th>Cancelada</th> */}
              </tr>
            </thead>
            <tbody>
              {reservas_list}
            </tbody>
          </table>
          <Link to={"/reservas/edit"} className='btn btn-primary'>Nueva Reserva</Link>
        </div>

        <Modal show={this.state.modal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cancelación de Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro/a de cancelar la reserva seleccionada?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.closeModal}>
              Volver
            </Button>
            <Button variant="danger" onClick={this.handleClickCancelar}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default Reservas

export function Reservas() {
  const navigate = useNavigate();
  const p = useParams();
  return (
    <>
      <InternalReservas navigate={navigate} params={p} />
    </>
  );
}