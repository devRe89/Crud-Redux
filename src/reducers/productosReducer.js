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

// Cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false,
    idProductoEliminar : null,
    productoEditar : []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case COMENZAR_EDICION:
        case OBTENIENDO_PRODUCTOS:
        case AGREGANDO_PRODUCTO:
            return{
                ...state, 
                loading: true,
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                loading: false,
                productos: [...state.productos, action.payload],
            }  
        case MOSTRAR_PRODUCTOS_ERROR:
        case AGREGAR_PRODUCTO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload
            }  
        case MOSTRAR_PRODUCTOS_EXITO:
            return{
                ...state,
                loading: false,
                productos: action.payload
            }  
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                loading: true,
                idProductoEliminar: action.payload
            } 
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                idProductoEliminar: null,
                loading: false,
                productos: state.productos.filter(producto => producto.id !== action.payload),
            } 
        case PRODUCTO_ELIMINADO_ERROR: 
            return{
                ...state,
                idProductoEliminar: null,
                loading: false,
                error: action.payload
            }   
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                productoEditar: action.payload
            }   
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productoEditar:null,
                loading:false
            }    
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                productoEditar: null,
                loading: false,
                error: action.payload
            }    
        default:
            return state;
    }
}