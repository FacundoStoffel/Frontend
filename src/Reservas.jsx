import React, { Component } from 'react'

export class Reservas extends Component {

  constructor(props) {
    super(props)

    this.state = {
      reservas: []
    }
  };

  componentDidMount() {
    fetch("http://localhost:8080/reservas")
      .then(res => res.json())
      .then(result => {
        this.setState({
          reservas: result
        });
      },
        error => {

        }
      )
  };

  render() {
    const reservas_list = this.state.reservas.map((reserva, index) => {
      return (
        <tr key={index}>
          <td>{reserva.fecha}</td>
          <td>{reserva.hora}</td>
          <td>{reserva.id_usuario}</td>
          <td>{reserva.id_corte}</td>
          <td>{reserva.id_pago}</td>
          <td>{reserva.cancelada}</td>
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

      </>
    )
  }
}

export default Reservas
