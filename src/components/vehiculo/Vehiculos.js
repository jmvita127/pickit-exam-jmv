import React, { useEffect } from 'react';
//components
import Vehiculo from './Vehiculo';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { getVehiculosAction } from '../../actions/vehiculoActions';

const Vehiculos = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        //consultar api
        const cargarVehiculos = () => dispatch(getVehiculosAction());
        cargarVehiculos();
    }, [dispatch]);

    //obtener state del store
    const vehiculos = useSelector(state => state.vehiculos.vehiculos);
    const error     = useSelector(state => state.vehiculos.error);
    const loading   = useSelector(state => state.vehiculos.loading);
    //console.log(vehiculos);

    return (
        <>
        <h2 className="text-center my-5">Listado de Vehiculos</h2>
        
        { error ? <p className="font-weight-bold alert alert-danger text-center mt-4">Error al cargar los vehiculos</p> : null }
        { loading ? <p className="text-center">Cargando vehiculos..</p> : null}
        
        <table className="table table-striped">
          <thead className="bg-primary table-dark">
              <tr>
                  <th scope="col">Propietario</th>
                  <th scope="col">Vehiculo</th>
                  <th scope="col">Servicios Facturados</th>
                  <th scope="col">Acciones</th>
              </tr>
          </thead>
          <tbody>
            { vehiculos.length === 0 ? 'No hay vehiculos para mostrar' : (
                vehiculos.map(vehiculo => (
                    <Vehiculo 
                     key={vehiculo.id}
                     vehiculo={vehiculo}
                    />
                ))
            )}
          </tbody>
        </table>
        </>
    );
}
 
export default Vehiculos;