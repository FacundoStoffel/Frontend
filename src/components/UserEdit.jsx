import React, { Component } from 'react'
import { toast } from 'react-toastify';

export class UserEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: "",
            apellido: "",
            mail: "",
            contrasena: ""
        }
    }

    configTosti = {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    }


    componentDidMount() {


        if (this.props.params.id_usuario) {
            this.fetchUser();
        }

    }


    handleSubmit = (event) => {

        event.preventDefault()

        let user = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            mail: this.state.mail,
            contrasena: this.state.contrasena,

        }

        let parametros = {
            method: this.props.params.id_usuario ? 'PUT' : 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = this.props.params.id_usuario
            ? `http://localhost:8080/reservas/edit/${this.props.params.id_usuario}`
            : "http://localhost:8080/reservas/create"
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
                        this.props.navigate("/reservas")
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }


    handleChangeMail = (event) => {
        this.setState({ mail: event.target.value });
    }

    handleChangeContrasena = (event) => {
        this.setState({ contrasena: event.target.value });
    }

    handleChangeNombre = (event) => {
        this.setState({ nombre: event.target.value });
    }

    handleChangeApellido = (event) => {
        this.setState({ apellido: event.target.value });
    }

  render() {
    return (
      <>
        <h1>{this.props.params.id_usuario ? `Edicion del usuario ${this.props.params.mail}` : null}</h1>
        <form onSubmit={this.handleSubmit} class="form" id='registro'>
                    <div className="register">
                        <div className="form-floating mb-3">
                            <input type="text"
                                className="form-control"
                                id="nombre"
                                placeholder="name@example.com"
                                onChange={this.handleChangeNombre}
                                name="nombre"
                                required />
                            <label htmlFor="nombre">Ingrese su nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text"
                                className="form-control"
                                id="apellido"
                                placeholder="name@example.com"
                                onChange={this.handleChangeApellido}
                                name="apellido"
                                required />
                            <label htmlFor="apellido">Ingrese su apellido</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email"
                                className="form-control"
                                id="mail"
                                placeholder="name@example.com"
                                onChange={this.handleChangeMail}
                                name="mail"
                                required />
                            <label htmlFor="correo">Correo Electrónico</label>
                        </div>
                        <div className="form-floating">
                            <input type="password"
                                className="form-control"
                                id="contrasena"
                                placeholder="Password"
                                onChange={this.handleChangeContrasena}
                                name="contrasena"
                                required />
                            <label htmlFor="contrasena">Contraseña</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary" id='registro_btn'>Confirmar</button>
                </form >
      </>
    )
  }
}

export default UserEdit
