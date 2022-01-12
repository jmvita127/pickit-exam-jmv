import React, { useState, useEffect } from 'react';
//routing
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { editarVehiculoAct } from '../../actions/vehiculoActions';

const EditarVehiculo = () => {
    //nuevo state del vehiculo
    const [vehiculo, setVehiculo] = useState({
        nombre: '', 
        apellido: '', 
        marca: '', 
        modelo: '', 
        color: '', 
        año: 0, 
        patente: ''
    });

    const dispatch = useDispatch();
    const nagivate = useNavigate();

    //vehiculo a editar
    const vehiculoEditar = useSelector(state => state.vehiculos.vehiculoEditar);

    //llenar el state al cargar pagina
    useEffect(() => {
        setVehiculo(vehiculoEditar)
    }, [vehiculoEditar])

    //leer datos del formulario
    const onChangeForm = (e) => {
        setVehiculo({
            ...vehiculo,
            [e.target.name] : e.target.value
        })
    }

    //console.log(vehiculo);
    const { nombre, apellido, marca, modelo, color, año, patente} = vehiculo

    const submitEditarVehiculo = (e) => {
        e.preventDefault();
        dispatch(editarVehiculoAct(vehiculo));
        nagivate('/');
    }
    
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Vehiculo
                        </h2>

                        <form
                         onSubmit={submitEditarVehiculo}
                        >
                            <div className="form-group">

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Nombre del propietario"
                                 name="nombre"
                                 value={nombre}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Apellido del propietario"
                                 name="apellido"
                                 value={apellido}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Marca del vehiculo"
                                 name="marca"
                                 value={marca}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Modelo del vehiculo"
                                 name="modelo"
                                 value={modelo}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="number"
                                 className="form-control mt-3"
                                 placeholder="Año del vehiculo"
                                 name="año"
                                 value={año}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Patente del vehiculo"
                                 name="patente"
                                 value={patente}
                                 onChange={onChangeForm}
                                 />

                                <input
                                 type="text"
                                 className="form-control mt-3"
                                 placeholder="Color del vehiculo"
                                 name="color"
                                 value={color}
                                 onChange={onChangeForm}
                                 />
                            </div>
                           <button 
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >GUARDAR CAMBIOS</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditarVehiculo;