import React, { Component } from 'react'

import { toast } from 'react-toastify';

export class Users extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          usuarios: [],
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
    
        fetch("http://localhost:8080/user", parametros)
    
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
                  usuarios: result.body,
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
    


  render() {


    const user_list = this.state.usuarios.map((user, index) =>{

        return (
            <tr key={index}>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.mail}</td>
              {/* <td>{reserva.corte_tipo}</td>
              <td>{reserva.metodo}</td>
     */}
              
            </tr>
          )
    });

    return (
      <>
        <h1>Usuarios</h1>
        <div className="tabla rounded-table">
          <table className='table table-striped ' id="tabla">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Mail</th>
                {/* <th>Corte</th>
                <th>Pago</th>
                <th></th> */}
                {/* <th>Cancelada</th> */}
              </tr>
            </thead>
            <tbody>
              {user_list}
            </tbody>
          </table>
        </div>

      </>
    )
  }
}

export default Users
