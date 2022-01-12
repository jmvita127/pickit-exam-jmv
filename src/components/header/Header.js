import React from 'react'
//routing
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <div className="container">
         <h1>
            <Link to={'/'} className="text-light">
                    Pick.It - CAR SERVICE
            </Link>
         </h1>
        </div>

        <Link 
         to={'/vehiculos/nuevo'}
         className="btn btn-danger nuevo-post d-block d-md-inline-block"
        >Registrar Vehiculo &#43;</Link>
    </nav>

    );
}
 
export default Header;