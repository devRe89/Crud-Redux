import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

//actions de redux
import {crearNuevoProductoAction} from '../actions/productoActions';

const NuevoProducto = ({history}) => {
    //utilizando useDispatch
    const dispatch = useDispatch();
    const agregarProducto = producto => dispatch ( crearNuevoProductoAction(producto) );

    // Obteniendo el state del reducer Productos
    const cargando = useSelector(state => state.productos.loading);
    const error = useSelector(state => state.productos.error);

    //State local
    const [datos, guardarDatos] = useState({
        nombre: '',
        precio: 0,
    });
    const {nombre, precio} = datos;

    //Obtenerdatos
    const obtenerDatos = e => {
        guardarDatos({
            ...datos,
            [e.target.name]: e.target.value
        });
    }

    //agregar un nuevo producto
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar campos
        if ( nombre.trim() === "" || precio === 0 ){
            console.log('error');
            return;
        }

        //Crear
        agregarProducto(datos);

        //redirección a home
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    onChange={obtenerDatos}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    onChange={obtenerDatos}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >
                                Agregar
                            </button>
                        </form>

                        {cargando ? <p>Cargando...</p> : null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;