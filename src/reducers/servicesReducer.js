import {
    INICIAR_DESCARGA_SERVICE,
    DESCARGA_SERVICE_EXITO,
    DESCARGA_SERVICE_ERROR
} from '../types';

const initialState = {
    servicios: [],
    error: null,
    loading: false
}

export default function vehiculosReducer(state = initialState, action) {
    switch(action.type) {
        case INICIAR_DESCARGA_SERVICE:
            return {
                ...state,
                loading: action.payload
            }
        case DESCARGA_SERVICE_EXITO:
            return {
                ...state,
                loading: false,
                error: false,
                servicios: action.payload
            }
        case DESCARGA_SERVICE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}