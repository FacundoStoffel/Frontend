import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export class InternalReservasEdit extends Component {

    constructor(props) {
        super(props)

        this.state = {
            fecha: null,
            hora: '',
            id_usuario: null,
            id_corte: null,
            id_pago: null,
            cancelada: null
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let reserva = {
            fecha: this.state.fecha,
            hora: this.state.fecha,
            id_usuario: this.state.id_usuario,
            id_corte: this.state.id_corte,
            id_pago: this.state.id_pago,
            cancelada: this.state.cancelada
        }

        let parametros = {
            method: 'POST',
            body: JSON.stringify(reserva),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        fetch('http://localhost:8080/reservas', parametros)
            .then(res => {
                try {
                    res.json().then(
                        body => {
                            return {
                                status: res.status,
                                ok: res.ok,
                                headers: res.headers,
                                body: body
                            };
                        }
                    )
                } catch (error) {
                    console.log(error);
                }
            })
            .then(
                (result) => {
                    if (result.ok) {
                        toast.success(result.body.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            });
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
                console.log(error)
            });
        // this.props.navigate("/reservas")
    }

    handleChangeFecha = (event) => {
        this.setState({ fecha: event.target.value });
    }

    handleChangeHora = (event) => {
        this.setState({ hora: event.target.value });
    }

    handleChangeCorte = (event) => {
        this.setState({ id_corte: event.target.value });
    }

    handleChangePago = (event) => {
        this.setState({ id_pago: event.target.value });
    }

    render() {
        return (
            <>
                <h1>Nueva Reserva</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3">
                        <select className="form-select"
                            id="fecha"
                            aria-label="Default select example"
                            name="fecha"
                            onChange={this.handleChangeFecha}
                            value={this.state.fecha}>

                            <option selected disabled>Seleccion la fecha</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <select className="form-select"
                            id="hora"
                            aria-label="Default select example"
                            name="hora"
                            onChange={this.handleChangeHora}
                            value={this.state.hora}>

                            <option selected disabled>Seleccione la hora</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                        </select>
                    </div>
                    <div className="mb-3 ">
                        <select className="form-select"
                            id="corte"
                            aria-label="Default select example"
                            name="id_corte"
                            onChange={this.handleChangeCorte}
                            value={this.state.id_corte}>

                            <option selected disabled>Seleccione el corte</option>
                            <option value="1">hola</option>
                            <option value="2">Two</option>

                        </select>
                    </div>
                    <p>Seleccion el metodo de pago</p>
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="id_pago"
                            id="metodo_efectivo"
                            onChange={this.handleChangePago}
                            value={this.state.id_pago} />

                        <label className="form-check-label" htmlFor="id_pago">
                            Efectivo
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input"
                            type="radio"
                            name="id_pago"
                            id="metodo_tarjeta"
                            checked
                            onChange={this.handleChangePago}
                            value={this.state.id_pago} />

                        <label className="form-check-label" htmlFor="id_pago">
                            Tarjeta
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
                
            </>
        )
    }
}

export default ReservasEdit


export function ReservasEdit() {
    const navigate = useNavigate();
    const p = useParams();
    return (
        <>
            <InternalReservasEdit navigate={navigate} params={p} />
        </>
    );
}
