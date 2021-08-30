import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {comenzarEdicionAction} from '../actions/productoActions';

const EditarProducto = ({history}) => {

    const [producto, guardarProducto] = useState({
        nombre: '',
        precio: 0
    });
    const productoEditar = useSelector(state => state.productos.productoEditar);

    const dispatch = useDispatch();

    const confirmarEditar = producto => dispatch( comenzarEdicionAction(producto) );
    
    useEffect(() => {
        guardarProducto(productoEditar);
    },[productoEditar]);
    
    const {nombre, precio, id} = producto;

    const onChangeProducts = e => {
        guardarProducto({
            ...producto,
            [e.target.name]: e.target.value
        });
    }

    const editProduct = e => {
        e.preventDefault();

        if (nombre.trim() === "" || Number(precio) <= 0){
            return;
        }

        confirmarEditar(producto);

        history.push('/');

    }
    
    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Editar Producto
                        </h2>

                        
                        
                            <form
                                
                                onSubmit={editProduct}
                            >
                                <div className="form-group">
                                    <label>Nombre Producto</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder="Nombre Producto"
                                        name="nombre"
                                        value={nombre}
                                        onChange={onChangeProducts}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Precio Producto</label>
                                    <input 
                                        type="number" 
                                        className="form-control"
                                        placeholder="Precio Producto"
                                        name="precio"
                                        value={precio} 
                                        onChange={onChangeProducts}     
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                                >
                                    Guadar Cambios
                                </button>
                            </form>
                           
                           

        

                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;