import {
    AGREGAR_VEHICULO,
    AGREGAR_VEHICULO_EXITO,
    AGREGAR_VEHICULO_ERROR,
    INICIAR_DESCARGA_VEHICULOS,
    DESCARGA_VEHICULOS_EXITO,
    DESCARGA_VEHICULOS_ERROR,
    OBTENER_VEHICULO_ELIMINAR,
    OBTENER_VEHICULO_ELIMINAR_EXITO,
    OBTENER_VEHICULO_ELIMINAR_ERROR,
    OBTENER_VEHICULO_EDITAR,
    OBTENER_VEHICULO_EDITAR_EXITO,
    OBTENER_VEHICULO_EDITAR_ERROR,
    INICIAR_EDICION_VEHICULO,
    INICIAR_DESCARGA_SERVICE,
    DESCARGA_SERVICE_EXITO,
    DESCARGA_SERVICE_ERROR
} from '../types';
import clientAxios from '../config/axios';
import Swal from 'sweetalert2';

//crear nuevo registro de vehiculo
export function crearNuevoVehiculoAction(vehiculo) {
        return async (dispatch) => {
            dispatch(agregarVehiculo());
            //consulta a db
            try {
                //insertar registro en la api
                await clientAxios.post('/vehiculos', vehiculo);
                //si no hay errores, actualizo state
                dispatch(agregarVehiculoExito(vehiculo));
                //alerta registro creado
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: '¡Vehiculo registrado correctamente!',
                    showConfirmButton: true,
                    confirmButtonColor: '#ff6c0e',
                })
            } catch (error) {
                //console.log(error);
                //si hay un error, actualizo state
                dispatch(agregarVehiculoError(true));
                //alerta error
                Swal.fire({
                    icon: 'error',
                    title: 'Error, no se pudo registrar el vehiculo',
                    confirmButtonColor: '#ff6c0e',
                    confirmButtonText: 'Cerrar'
                  })
            }
        } 
}


const agregarVehiculo = () => ({
    type: AGREGAR_VEHICULO,
    payload: true  //modifica el state, no haria falta en la creacion de registro
})

//si el vehiculo se guarda en la db
const agregarVehiculoExito = (vehiculo) => ({
    type: AGREGAR_VEHICULO_EXITO,
    payload: vehiculo
})
//si hay error
const agregarVehiculoError = (state) => ({
    type: AGREGAR_VEHICULO_ERROR,
    payload: state,
})

//metodo que descarga los vehiculos de la db.json
export function getVehiculosAction() {
    return async (dispatch) => {
        dispatch(getVehiculos());

        try {
            const respuesta = await clientAxios.get('/vehiculos');
            //console.log(respuesta.data);
            //si el llamado es correcto
            dispatch(getVehiculosExito(respuesta.data));
        } catch (error) {
            //console.log(error);
            dispatch (getVehiculosError());
        }
    }
}


const getVehiculos = () => ({
    type: INICIAR_DESCARGA_VEHICULOS,
    payload: true
})

const getVehiculosExito = (vehiculos) => ({
    type: DESCARGA_VEHICULOS_EXITO,
    payload: vehiculos
})

const getVehiculosError = () => ({
    type: DESCARGA_VEHICULOS_ERROR,
    payload: true
})

//selecciona y elimina el vehiculoi
export function eliminarVehiculoAction(id) {
    return async (dispatch) => {
        dispatch(getVehiculoEliminar(id));
        //console.log(id);
        try {
            await clientAxios.delete(`/vehiculos/${id}`);
            dispatch(getVehiculoEliminarExito());
        } catch (error) {
            //console.log(error);
            dispatch(getVehiculoEliminarError());
        }
    }
}

const getVehiculoEliminar = (id) => ({
    type: OBTENER_VEHICULO_ELIMINAR,
    payload: id 
});

const getVehiculoEliminarExito = () => ({
    type: OBTENER_VEHICULO_ELIMINAR_EXITO,
    //payload no es necesario, lo leemos directo del state
})

const getVehiculoEliminarError = () => ({
    type: OBTENER_VEHICULO_ELIMINAR_ERROR,
    payload: true
})


//selecciona y edita el vehiculo
export function editarVehiculoAction(vehiculo) {
    return async (dispatch) => {
        dispatch(getVehiculoEditar(vehiculo));
    }
}

const getVehiculoEditar = (vehiculo) => ({
    type: OBTENER_VEHICULO_EDITAR,
    payload: vehiculo
})

//editar registro en api y state
export function editarVehiculoAct(vehiculo) {
    return async (dispatch) => {
        dispatch( editarVehiculo(vehiculo))
        try {
            clientAxios.put(`/vehiculos/${vehiculo.id}`, vehiculo);
            dispatch(editarVehiculoExito(vehiculo));
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Vehiculo editado correctamente',
                showConfirmButton: true,
                confirmButtonColor: '#ff6c0e',
            })
        } catch (error) {
            //console.log(error);
            dispatch(editarVehiculoError(true));
        }
    }
}

const editarVehiculo = () => ({
    type: INICIAR_EDICION_VEHICULO
})

const editarVehiculoExito = (vehiculo) => ({
    type: OBTENER_VEHICULO_EDITAR_EXITO,
    payload: vehiculo
})

const editarVehiculoError = (state) => ({
    type: OBTENER_VEHICULO_EDITAR_ERROR,
    payload: state
})


//servicios
//metodo que descarga los servicios de la db.json
export function getServiceAction() {
    return async (dispatch) => {
        dispatch(getServices());

        try {
            const respuesta = await clientAxios.get('/servicios');
            //console.log(respuesta.data);
            //si el llamado es correcto
            dispatch(getServicesExito(respuesta.data));
        } catch (error) {
            //console.log(error);
            dispatch (getServicesError());
        }
    }
}


const getServices = () => ({
    type: INICIAR_DESCARGA_SERVICE,
    payload: true
})

const getServicesExito = (vehiculos) => ({
    type: DESCARGA_SERVICE_EXITO,
    payload: vehiculos
})

const getServicesError = () => ({
    type: DESCARGA_SERVICE_ERROR,
    payload: true
})