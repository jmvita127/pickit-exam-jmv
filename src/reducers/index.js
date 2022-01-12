//combinador de reducers
import { combineReducers }from 'redux';
import vehiculosReducer from './vehiculosReducer';
import servicesReducer from './servicesReducer';
import alertaReducer from './alertaReducer';

export default combineReducers({
    vehiculos : vehiculosReducer,
    servicios : servicesReducer,
    alerta    : alertaReducer
});