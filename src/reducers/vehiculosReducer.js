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
    OBTENER_VEHICULO_EDITAR_ERROR
} from '../types';

//cada reducer tiene su propio state
const initialState = {
    vehiculos: [],
    error: null,
    loading: false,
    vehiculoEliminar: null,
    vehiculoEditar: null
}

export default function vehiculosReducer(state = initialState, action) {
    switch(action.type) {
        case AGREGAR_VEHICULO:
        case INICIAR_DESCARGA_VEHICULOS:
            return {
                ...state,
                loading: action.payload
            }
        case AGREGAR_VEHICULO_EXITO:
            return {
                ...state,
                loading: false,
                vehiculos: [...state.vehiculos, action.payload]
            }
        case AGREGAR_VEHICULO_ERROR:
        case DESCARGA_VEHICULOS_ERROR:
        case OBTENER_VEHICULO_ELIMINAR_ERROR:
        case OBTENER_VEHICULO_EDITAR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DESCARGA_VEHICULOS_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                vehiculos: action.payload
            }
        case OBTENER_VEHICULO_ELIMINAR:
            return {
                ...state,
                vehiculoEliminar: action.payload
            }
        case OBTENER_VEHICULO_ELIMINAR_EXITO:
            return {
                ...state,
                vehiculos: state.vehiculos.filter(vehiculo => vehiculo.id !== state.vehiculoEliminar),
                vehiculoEliminar: null
            }
        case OBTENER_VEHICULO_EDITAR:
            return {
                ...state,
                vehiculoEditar: action.payload
            }
        case OBTENER_VEHICULO_EDITAR_EXITO:
            return {
                ...state,
                vehiculoEditar: null,
                vehiculos: state.vehiculos.map(
                    vehiculo => vehiculo.id === action.payload.id ? vehiculo = action.payload : vehiculo
                )
            }
        default:
            return state;
    }
}