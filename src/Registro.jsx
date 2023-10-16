import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalRegistro extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nombre: '',
            apellido: '',
            mail: '',
            contrasena: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let registro = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            mail: this.state.mail,
            contrasena: this.state.contrasena
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(registro),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/user/register', parametros)
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
            })
            .then(
                result => {
                    if (result.ok) {
                        toast.success('Usuario creado', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                         this.props.navigate("/")
                    } else {
                        toast.error(result.body.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                })
            .catch((error) => {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
        // this.props.navigate("/reservas")
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
                <h1>Registrarse</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="register">
                    <div className="form-floating mb-3">
                            <input type="text" 
                            className="form-control" 
                            id="nombre" 
                            placeholder="name@example.com"
                            onChange={this.handleChangeNombre}
                            name="nombre" />
                            <label for="nombre">Ingrese su nombre</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" 
                            className="form-control" 
                            id="apellido" 
                            placeholder="name@example.com"
                            onChange={this.handleChangeApellido}
                            name="apellido" />
                            <label for="apellido">Ingrese su apellido</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" 
                            className="form-control" 
                            id="mail" 
                            placeholder="name@example.com"
                            onChange={this.handleChangeMail}
                            name="mail" />
                            <label for="correo">Correo Electrónico</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" 
                            className="form-control" 
                            id="contrasena" 
                            placeholder="Password"
                            onChange={this.handleChangeContrasena}
                            name="contrasena" />
                            <label for="contrasena">Contraseña</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form >

            </>
        )
    }
}

export default Registro


export function Registro() {
    const navigate = useNavigate();
    const p = useParams();
    return (
        <>
            <InternalRegistro navigate={navigate} params={p} />
        </>
    );
}
