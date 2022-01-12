import React from 'react';
//components
import Header          from './components/header/Header';
import Vehiculos       from './components/vehiculo/Vehiculos';
import NuevoVehiculo   from './components/vehiculo/NuevoVehiculo';
import EditarVehiculo  from './components/vehiculo/EditarVehiculo';
import IniciarServicio from './components/servicio/IniciarServicio';
//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//redux
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Router>
     <Provider store={store}>
      <Header />
       <div className="container mt-5">
         <Routes>
          <Route exact path="/"                       element={<Vehiculos/>} />
          <Route exact path="/vehiculos/nuevo"        element={<NuevoVehiculo/>} />
          <Route exact path="/vehiculo/editar/:id"    element={<EditarVehiculo/>} />
          <Route exact path="/vehiculo/service/:id"   element={<IniciarServicio/>} />
         </Routes>
        </div>
     </Provider>
    </Router>
  );
}

export default App;
