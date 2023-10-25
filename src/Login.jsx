import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class InternalLogin extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mail: '',
            contrasena: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let login = {
            mail: this.state.mail,
            contrasena: this.state.contrasena
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/security/login', parametros)
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
                        sessionStorage.setItem('token', result.body.token)

                        toast.success('Bienvenido', {
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

    render() {
        return (
            <>
                <h1>Iniciar Sesión</h1>
                <form onSubmit={this.handleSubmit} className="form">
                    <div className="login">
                        <div className="form-floating mb-3">
                            <input type="email"
                                className="form-control"
                                id="mail"
                                placeholder="name@example.com"
                                onChange={this.handleChangeMail}
                                name="mail" />
                            <label htmlFor="correo">Correo Electrónico</label>
                        </div>
                        <div className="form-floating">
                            <input type="password"
                                className="form-control"
                                id="contrasena"
                                placeholder="Password"
                                onChange={this.handleChangeContrasena}
                                name="contrasena" />
                            <label htmlFor="contrasena">Contraseña</label>
                        </div>
                        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form >

            </>
        )
    }
}

export default Login


export function Login() {
    const navigate = useNavigate();
    const p = useParams();
    return (
        <>
            <InternalLogin navigate={navigate} params={p} />
        </>
    );
}









// import React, { Component } from 'react'
// import './styles/Login.css';

// export class Login extends Component {
//     render() {
//         return (
//             <>
//             <div class="login">
//             <h1>Iniciar Sesión</h1>
//                 <div className="form-floating mb-3">
//                     <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
//                     <label for="floatingInput">Correo Electrónico</label>
//                 </div>
//                 <div className="form-floating">
//                     <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
//                     <label for="floatingPassword">Contraseña</label>
//                 </div>
//                 <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
//                 </div>
//             </>
//         )
//     }
// }

// export default Login
