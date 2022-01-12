import React from 'react';
import Swal from 'sweetalert2';
//routing
import { useNavigate } from 'react-router-dom';
//redux
import { useDispatch } from 'react-redux';
import { eliminarVehiculoAction, editarVehiculoAction } from '../../actions/vehiculoActions';


const Vehiculo = ({vehiculo}) => {

    const { nombre, apellido, marca, modelo, color, servicios, id } = vehiculo
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //confirmar si desea eliminarlo
    const confirmarEliminarVehiculo = (id) => {
        //preguntar al usuario
        Swal.fire({
            title: '¿Esta seguro que quiere eliminar este vehiculo?',
            text: marca + ' ' + modelo + ' (' + color + ')',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff6c0e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              //pasarlo al action
              dispatch(eliminarVehiculoAction(id));  
              Swal.fire({
                title:'¡Vehiculo eliminado correctamente!',
                text: marca + ' ' + modelo + ' (' + color + ')',
                confirmButtonColor: '#ff6c0e',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK',
              })
            }
          })
    }

    //metodo que obtiene facturacion total (popup)
    const showServiciosFacturados = () => {
      Swal.fire({
        title: 'SERVICIOS FACTURADOS' ,
        text: nombre + ' ' + apellido + ' - ' + marca + ' ' + modelo + ' (' + color + ')',
        confirmButtonColor: '#ff6c0e',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK',
      })
    }

    //metodo que redirecciona
    const redirectEdicion = vehiculo => {
      dispatch(editarVehiculoAction(vehiculo));
      navigate(`/vehiculo/editar/${vehiculo.id}`)
    }

    const redirectService = vehiculo => {
      dispatch(editarVehiculoAction(vehiculo));
      navigate(`/vehiculo/service/${vehiculo.id}`)
    }
    
    return ( 
        <tr>
            <td
             onClick={() => showServiciosFacturados()}
            >{nombre + ' ' + apellido}</td>
            <td>{marca + ' ' + modelo + ' (' + color + ')'}</td>
            <td>{servicios.length === 0 ? 'No hay servicios para mostrar' : (
              
              vehiculo.servicios.map(serv => (
                serv.nombre + ' ($' + serv.precio + ')'
              
              )))}
            </td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={() => redirectEdicion(vehiculo)}
                    className="btn btn-primary mr-2">
                    Editar Vehiculo
                </button>
                <button
                 type= "button"
                 className="btn btn-danger"
                 onClick={() => confirmarEliminarVehiculo(id)}
                >Eliminar</button>
                <button
                 onClick={() => redirectService(vehiculo)}
                 type= "button"
                 className="btn btn-primary ml-2"
                >Service</button>
            </td>
        </tr>
     );
}
 
export default Vehiculo;