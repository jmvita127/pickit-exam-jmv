import React, { useState, useEffect } from 'react';
//components
import Servicio from './Servicio';
//routing
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { editarVehiculoAct } from '../../actions/vehiculoActions';
import { getServiceAction } from '../../actions/vehiculoActions';

const IniciarServicio = () => {
    
    //nuevo state del vehiculo
    const [vehiculo, setVehiculo] = useState({
        nombre: '', 
        apellido: '', 
        marca: '', 
        modelo: '', 
        color: '', 
        año: 0, 
        patente: '',
        servicios: []
    });

    const dispatch = useDispatch();
    const nagivate = useNavigate();

    //vehiculo a editar
    const vehiculoEditar = useSelector(state => state.vehiculos.vehiculoEditar);
    
    //extraer info del store para servicios
    const servicios = useSelector(state => state.servicios.servicios);
    const error     = useSelector(state => state.vehiculos.error);
    const loading   = useSelector(state => state.vehiculos.loading);

    //llenar el state al cargar pagina
    useEffect(() => {
        setVehiculo(vehiculoEditar)
        //obtener servicios
        const cargarServicios = () => dispatch(getServiceAction());
        cargarServicios();
    }, [vehiculoEditar, dispatch])

    //checkbox
    const handleCheck = (checked, service) => {
        if (checked) {
          setVehiculo({
            ...vehiculo,
            servicios : [service]
          });
          return;
        }
        if (!checked) {
          const filtered = vehiculo.servicios.filter((item) => item.id !== service.id);
          setVehiculo({
            ...vehiculo,
            servicios : [filtered]
          });
          return;
        }
      };

    //leer datos del formulario
    const onChangeForm = (e) => {
        setVehiculo({
            ...vehiculo,
            [e.target.name] : e.target.value,
        })
    }
    
    //console.log(vehiculo);
    const { nombre, apellido, marca, modelo, color, año, patente } = vehiculo

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
                            Seccion Service 
                        </h2>

                        <form
                         onSubmit={submitEditarVehiculo}
                        >
                            <div className="form-group">

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Nombre del propietario"
                                 name="nombre"
                                 value={nombre}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Apellido del propietario"
                                 name="apellido"
                                 value={apellido}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Marca del vehiculo"
                                 name="marca"
                                 value={marca}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Modelo del vehiculo"
                                 name="modelo"
                                 value={modelo}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="hidden"
                                 className="m-1"
                                 placeholder="Año del vehiculo"
                                 name="año"
                                 value={año}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Patente del vehiculo"
                                 name="patente"
                                 value={patente}
                                 onChange={onChangeForm}
                                 disabled
                                 />

                                <input
                                 type="text"
                                 className="m-1"
                                 placeholder="Color del vehiculo"
                                 name="color"
                                 value={color}
                                 onChange={onChangeForm}
                                 disabled
                                 />
                                
                                { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Error al cargar los servicios</p> : null }
                                { loading ? <p className="text-center">Cargando servicios..</p> : null}
                                
                                { servicios.length === 0 ? 'No hay servicios para mostrar' : (
                                    vehiculo.color !== "Gris" ? 
                                    servicios.map(servicio => (
                                        <Servicio 
                                        key={servicio.id}
                                        servicio={servicio}
                                        handleCheck={handleCheck}
                                        />
                                    ))
                                   :
                                   servicios.filter((serv) => serv.id !== 5).map(servicio => (
                                    <Servicio 
                                    key={servicio.id}
                                    servicio={servicio}
                                    handleCheck={handleCheck}
                                    />
                                   ))
                                 )
                                }
                               
                            </div>
                            <p className="text-center">Recodatorio: si el vehiculo es de color "Gris", el servicio de pintura no se vera reflejado.</p>
                           <button 
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Facturar service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default IniciarServicio;