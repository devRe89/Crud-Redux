import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';

//redux 
import {useDispatch} from 'react-redux';
import { borrarProductoAction } from '../actions/productoActions';


const Producto = ({producto}) => {

    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {
        // confirmar

        //pasar a action
        dispatch( borrarProductoAction(id) );
    }

    return ( 
        <tr>
            <td>{producto.nombre}</td>
            <td>
                <span className="font-weight-bold">
                    $ {producto.precio}
                </span>
            </td>
            <td className="acciones">
                <Link to={`/productos/editar/${producto.id}`} className="btn btn-primary mr-2">
                    Editar
                </Link>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmarEliminarProducto(producto.id)}
                >Elimiar</button>
            </td>
        </tr>
     );
}
 
export default Producto;