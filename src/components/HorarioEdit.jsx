import React, { Component } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../styles/horaEdit.css';



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


    componentDidMount() {
        
        if (this.props.params.hora) {
           
            let parametros = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': sessionStorage.getItem('token')
                }
            }
      
            fetch(`http://localhost:8080/hora/${this.props.params.hora}`, parametros)
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
                                hora: result.body.detail.hora,
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
        }
    }


    handleSubmit = (event) => {

        event.preventDefault()

        let nueva_hora = {
            hora: this.state.hora

        }

        let parametros = {
            method: this.props.params.hora ? 'PUT' : 'POST',
            body: JSON.stringify(nueva_hora),
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = this.props.params.hora ? `http://localhost:8080/hora/edit/${this.props.params.hora}` : "http://localhost:8080/hora/create"
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
                <h1>{this.props.params.hora ? `Edicion del Horario de las ${this.props.params.hora}` : "Nuevo Horario"}</h1>
                <form onSubmit={this.handleSubmit} className='horaForm'>
                    <div className="form-floating mb-3">
                        <input type="text"
                            className="form-control"
                            id="hora"
                            placeholder="name@example.com"
                            onChange={this.handleChangeHora}
                            name="hora"
                            required />
                        <label for="hora">Ingrese el horario (en formato 00:00)</label>
                    </div>
                    <button type="submit" class="btn btn-primary" id='confirmar'>Confirmar</button>

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
