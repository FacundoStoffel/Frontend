import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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






    render() {
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
          </td>

                </tr>
            )
        });

        return (
            <>
                <h1>Horarios</h1>
                <div className='ml-auto d-flex '>
                <Link to={"/horario/edit"} className='btn btn-primary'>Nuevo Horario</Link>
                </div>
            
                <table className='table table-striped'>
                    <thead>
                        <tr>

                            <th>Hora</th>

                        </tr>
                    </thead>
                    <tbody>
                        {horarios_list}
                    </tbody>
                </table>
                {/* <Link to={"/horario/edit"} className='btn btn-primary'>Nuevo Horario</Link> */}

            </>
        )
    }
}

export default Horario
