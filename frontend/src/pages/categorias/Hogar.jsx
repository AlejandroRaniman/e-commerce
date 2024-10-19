import React, { useEffect, useState } from 'react';
import '../../styles/categorias/Hogar.css';

const Hogar = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/products/Hogar');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      console.log('Productos cargados:', data); // Log para verificar los productos
      setProducts(data);
      setFilteredProducts(data);  // Establecer productos filtrados igual a los productos iniciales
      setLoading(false); // Agregar esto para terminar la carga
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos.');
      setLoading(false); // Asegúrate de finalizar la carga también cuando hay error
    }
  };
  

  const addToCart = async (productId, quantity) => {
    try {
      let sessionId = localStorage.getItem('session_id');
      if (!sessionId) {
        sessionId = generateSessionId(); // Genera un nuevo ID único
        localStorage.setItem('session_id', sessionId);
      }

      const response = await fetch('http://127.0.0.1:5000/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
          session_id: sessionId,
        }),
      });
      

      if (!response.ok) {
        throw new Error('Error al añadir el producto al carrito');
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('Error al añadir el producto al carrito.');
    }
  };

  const generateSessionId = () => {
    return 'session-' + Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="container">
      {/* Filtros laterales */}
      <aside className="filter-sidebar">
        <div className="container-filter">
          <h3>Filtros</h3>
          <a href="#" onClick={() => setFilteredProducts(products)} className="clear-filters">
            Limpiar Filtros
          </a>
        </div>
        <div className="filter-group">
          <h4>Filtrar Productos</h4>
          <input
            type="text"
            value={filter}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setFilter(value);
              setFilteredProducts(
                products.filter(
                  (product) =>
                    product.name.toLowerCase().includes(value) ||
                    product.category.toLowerCase().includes(value)
                )
              );
            }}
            placeholder="Buscar producto..."
          />
        </div>
      </aside>

      {/* Productos */}
      <div className="product-section">
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.image_url || 'placeholder.png'} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p>ID: {product.id}</p>
                  <p>Precio: {product.price}</p>
                  <p>Inventario: {product.quantity || 'N/A'}</p>
                  <div className="product-actions">
                    <button>-</button>
                    <input type="number" defaultValue="1" id={`quantity-${product.id}`} />
                    <button>+</button>
                    <button
                      className="add-to-cart"
                      onClick={() => {
                        const quantity = parseInt(
                          document.getElementById(`quantity-${product.id}`).value
                        );
                        addToCart(product.id, quantity);
                      }}
                    >
                      Añadir al carrito
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No se encontraron productos.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hogar;
