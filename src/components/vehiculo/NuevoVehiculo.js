import React, {useState} from 'react';
//actions-redux
import { useDispatch, useSelector } from 'react-redux';
import { crearNuevoVehiculoAction } from '../../actions/vehiculoActions';
import { mostrarAlerta, ocultarAlertaAction } from '../../actions/alertaActions';
//routing
import { useNavigate } from "react-router-dom";

const NuevoVehiculo = () => {

    //state del componente
    const [nombre,  guardarNombre]      = useState('');
    const [apellido, guardarApellido]   = useState('');
    const [marca, guardarMarca]         = useState('');
    const [modelo, guardarModelo]       = useState('');
    const [año, guardarAño]             = useState();
    const [patente, guardarPatente]     = useState('');
    const [color, guardarColor]         = useState('');
    const [servicios, guardarServicios] = useState([]);

    //acceder al state del store
    const cargando = useSelector((state) => state.vehiculos.loading);
    const error    = useSelector((state) => state.vehiculos.error);
    const alerta   = useSelector((state) => state.alerta.alerta);

    //llamar metodo del action 
    const dispatch = useDispatch();
    const agregarVehiculo = (vehiculo) => dispatch(crearNuevoVehiculoAction(vehiculo));
    
    //redirect
    const navigate = useNavigate();

    //cuando el usuario haga el submit de un nuevo registro de vehiculo
    const submitNuevoVehiculo = (e) => {
        e.preventDefault();
        //validar formulario
        if(nombre.trim() === '' || apellido.trim() === '') {
            const alerta = {
                msg: 'Nombre y Apellido son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(mostrarAlerta(alerta));
            return;
        } 
        //si no hay errores..
        dispatch(ocultarAlertaAction());
        //crear nuevo registro
        agregarVehiculo({
            nombre,
            apellido,
            marca,
            modelo,
            año,
            patente,
            color,
            servicios
        });
        //redireccionar al home
        navigate('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Registrar nuevo vehiculo
                        </h2>
                        { alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form
                         onSubmit={submitNuevoVehiculo}
                        >
                            <div className="form-group">


                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Nombre del propietario"
                                 name="nombre"
                                 value={nombre}
                                 onChange={e => guardarNombre(e.target.value)}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Apellido del propietario"
                                 name="apellido"
                                 value={apellido}
                                 onChange={e => guardarApellido(e.target.value)}
                                 />

                                
                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Marca del vehiculo"
                                 name="marca"
                                 value={marca}
                                 onChange={e => guardarMarca(e.target.value)}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Modelo del vehiculo"
                                 name="modelo"
                                 value={modelo}
                                 onChange={e => guardarModelo(e.target.value)}
                                 />

                                <input
                                 type="number"
                                 className="form-control mt-3"
                                 placeholder="Año del vehiculo"
                                 name="año"
                                 value={año}
                                 onChange={e => guardarAño(Number(e.target.value))}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Patente del vehiculo"
                                 name="patente"
                                 value={patente}
                                 onChange={e => guardarPatente(e.target.value)}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Color del vehiculo"
                                 name="color"
                                 value={color}
                                 onChange={e => guardarColor(e.target.value)}
                                 />

                                <input
                                 type="hidden"
                                 className="form-control mt-3"
                                 placeholder="Color del vehiculo"
                                 name="servicios"
                                 value={servicios}
                                 onChange={e => guardarServicios(e.target.value)}
                                 />
                            </div>
                           <button 
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >AGREGAR</button>
                        </form>
                        {cargando ? <p>Cargando..</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoVehiculo;