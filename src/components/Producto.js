import React, {Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Swal from 'sweetalert2';

//redux 
import {useDispatch} from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';


const Producto = ({producto}) => {

    const dispatch = useDispatch();

    const confirmarEliminarProducto = id => {
        // confirmar

        //pasar a action
        dispatch( borrarProductoAction(id) );
    }

    const history = useHistory();

    const redirectEditProduct = producto => {
        dispatch( obtenerProductoEditar(producto) );
        history.push(`/productos/editar/${producto.id}`);
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
                <button 
                    type="button"
                    onClick={() => redirectEditProduct(producto)}
                    className="btn btn-primary mr-2"
                >Editar</button>
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