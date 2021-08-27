import React, {Fragment, useEffect} from 'react';
import Producto from './Producto';
import {useDispatch, useSelector} from 'react-redux';
import { listadoProductosAction } from '../actions/productoActions';

const Productos = () => {

    const dispatch = useDispatch();
    const productos = useSelector(state => state.productos.productos);
    const cargando = useSelector(state => state.productos.cargando);

    
    useEffect(()=> {
        const listadoProductos = () => dispatch( listadoProductosAction() );
        listadoProductos()
    },[]);

    return ( 
        <Fragment>
            <h2 className="text-center my-5">Listado de Productos</h2>
            {cargando ? <p className="text-center mt-2">Cargando...</p> : null}

            <table className="table table-striped">
                <thead className="bg-primary table-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Aciones</th>
                    </tr>
                </thead>
                <tbody>
                    { productos.length === 0 ? 
                    ( <tr>
                        <th>No hay productos</th>
                        </tr> 
                    )
                    : (
                        productos.map(producto => (
                            <Producto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))  
                    )}
                </tbody>
            </table>
        </Fragment>
     );
}
 
export default Productos;