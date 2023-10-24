import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export class InternalHorarioEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            hora: ''
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

    handleSubmit = (event) => {

        event.preventDefault()

        let nueva_hora = {
            hora: this.state.hora

        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(nueva_hora),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/hora/create', parametros)
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
                        this.props.navigate("/horario")
                    } else {
                        toast.error(result.body.message, this.configTosti);
                    }
                }
            ).catch(
                (error) => { console.log(error) }
            );
    }

    handleChangeHora = (event) => {
        this.setState({ hora: event.target.value });
    }

    render() {
        return (
            <>
                <h1>Nuevo Horario</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="hora"
                            placeholder="name@example.com"
                            onChange={this.handleChangeHora}
                            name="hora"
                            required />
                        <label for="hora">Ingrese el nuevo horario</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Confirmar</button>

                </form>
            </>
        )
    }
}

export default HorarioEdit



export function HorarioEdit() {
    const navigate = useNavigate();
    const p = useParams();
    return (
        <>
            <InternalHorarioEdit navigate={navigate} params={p} />
        </>
    );
}
