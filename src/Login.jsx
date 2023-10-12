import React, { Component } from 'react'
import './Login.css';

export class Login extends Component {
    render() {
        return (
            <>
            <div class="login">
            <h1>Iniciar Sesión</h1>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </>
        )
    }
}

export default Login
