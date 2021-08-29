import {
    AGREGANDO_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    OBTENIENDO_PRODUCTOS,
    MOSTRAR_PRODUCTOS_ERROR,
    MOSTRAR_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO
} from '../types';

import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

// crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch ( agregarProducto() );

        try {
            //insertar en API producto
            await axiosClient.post('/productos', producto);

            //Si todo sale bien al insertar
            dispatch( agregarProductoExito(producto) );

            Swal.fire(
                'Correcto',
                'El producto fue agregado correctamente',
                'success'
            );
        } catch (error) {
            
            // Si hay error, Cambiar state.
            dispatch( agregarProductoError(true) );

            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type: AGREGANDO_PRODUCTO
});

// Si el producto se agrego correctamente
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});

//Obtener productos 
export function listadoProductosAction() {
    return async (dispatch) => {
        dispatch(obteniendoProductos());

        try {
            const respuesta = await axiosClient.get('/productos');
            dispatch( mostrarProductosExito(respuesta.data) );
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
            dispatch( mostrarProductosError(true) );
        }

    }
}

const obteniendoProductos = () => ({
    type: OBTENIENDO_PRODUCTOS
});

const mostrarProductosExito = productos => ({
    type: MOSTRAR_PRODUCTOS_EXITO,
    payload: productos
});

const mostrarProductosError = estado => ({
    type: MOSTRAR_PRODUCTOS_ERROR,
    payload: estado,
});

export function borrarProductoAction(id) {
    return (dispatch) => {
        dispatch( obteniendoProductoEliminar(id) );
    }
}

const obteniendoProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});