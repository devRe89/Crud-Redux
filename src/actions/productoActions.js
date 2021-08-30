import {
    AGREGANDO_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    OBTENIENDO_PRODUCTOS,
    MOSTRAR_PRODUCTOS_ERROR,
    MOSTRAR_PRODUCTOS_EXITO,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_ERROR,
    PRODUCTO_ELIMINADO_EXITO,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR,
    COMENZAR_EDICION
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
    return async (dispatch) => {
        dispatch( obteniendoProductoEliminar(id) );

        try {
            await axiosClient.delete(`/productos/${id}`);
            dispatch( productoEliminadoExito(id) );
            Swal.fire(
                'Correcto',
                'Producto Eliminado',
                'success'
            );
        } catch (error) {
            console.log(error);
            dispatch( productoEliminadoError(true) );
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });

        }
    }
}

const obteniendoProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const productoEliminadoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
});

const productoEliminadoError = estado => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: estado,
});



//Obteniendo datos del producto para mostrar en formulario de edición
export function obtenerProductoEditar(producto) {
    return  (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto) );
    }
}

const obtenerProductoEditarAction = producto => ({
    type:OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

export function comenzarEdicionAction(producto){
    return  async(dispatch) => {
        dispatch( comenzarEdicion() );

        try {
            await axiosClient.put(`/productos/${producto.id}`, producto);
            dispatch( productoEditadoExito() );
            Swal.fire(
                'Correcto',
                'Producto Editado',
                'success'
            );
        } catch (error) {
            dispatch( productoEditadoError(true) )
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const comenzarEdicion = () => ({
    type: COMENZAR_EDICION
});

const productoEditadoExito = () => ({
    type: PRODUCTO_EDITADO_EXITO
});

const productoEditadoError = estado => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: estado
});