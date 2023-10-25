import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './../styles/hora.css';

export class Horario extends Component {

    constructor(props) {
        super(props)

        this.state = {
            horarios: [],
            modal: false
        }
    }


    componentDidMount() {

        let parametros = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }

        fetch("http://localhost:8080/hora", parametros)
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
                            horarios: result.body,
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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorization': sessionStorage.getItem('token')
            }
        }
        const url = `http://localhost:8080/hora/delete/${this.state.idToDelete}`
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


    showModal = (hora) => {
        this.setState({
            modal: true,
            idToDelete: hora
        })

    }

    closeModal = () => {
        this.setState({
            modal: false,
            idToDelete: null
        })
    }





    render() {
        console.log(sessionStorage.getItem('token'))
        const horarios_list = this.state.horarios.map((hora, index) => {
            return (
                <tr key={index}>

                    <td>{hora.hora}</td>
                    <td>
                        <Link to={`/horario/edit/${hora.hora}`} className='btn btn-primary'>
                            <span class="material-symbols-outlined">
                                edit
                            </span>
                        </Link>
                        <button className='btn btn-outline-danger' onClick={() => this.showModal(hora.hora)}>
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                        </button>
                    </td>

                </tr>
            )
        });

        return (
            <>
                <h1>Horarios</h1>
                <div className="tabla rounded-table"  id="table_hora">
                <div className='ml-auto d-flex ' id="hora_nueva">
                    <Link to={"/horario/edit"} className='btn btn-primary' >Nuevo Horario</Link>
                </div>

                <table className='table table-striped'>
                    <thead>
                        <tr>

                            <th>Hora</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {horarios_list}
                    </tbody>
                </table>
                </div>
                {/* <Link to={"/horario/edit"} className='btn btn-primary'>Nuevo Horario</Link> */}

                <Modal show={this.state.modal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminacion Horario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Está seguro/a de la eliminacion del horario?</Modal.Body>
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

export default Horario
