import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Baño = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Solicitar productos desde el backend
        axios.get('/api/productos/Baño')
            .then(response => {
                setProductos(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Productos de Baño</h1>
            <div className="productos">
                {productos.map((producto) => (
                    <div key={producto.id} className="producto">
                        <h2>{producto.title}</h2>
                        <p>Categoría: {producto.categoria}</p>
                        <p>Precio: ${producto.price}</p>
                        <p>Cantidad: {producto.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Baño;
