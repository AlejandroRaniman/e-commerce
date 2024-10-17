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

  // Obtener los productos desde el backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
        const response = await fetch('http://127.0.0.1:5000/products/Hogar');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  // Manejar el cambio de filtro
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(value) ||
        product.categoria.toLowerCase().includes(value)
      )
    );
  };

  // Limpiar los filtros
  const clearFilters = () => {
    setFilter('');
    setFilteredProducts(products);
  };

  return (
    <div className="container">
      {/* Filtros laterales */}
      <aside className="filter-sidebar">
        <div className="container-filter">
          <h3>Filtros</h3>
          <a href="#" onClick={clearFilters} className="clear-filters">Limpiar Filtros</a>
        </div>
        <div className="filter-group">
          <h4>Filtrar Productos</h4>
          <input
            type="text"
            value={filter}
            onChange={handleFilterChange}
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
                  <img src={`http://127.0.0.1:5000/static/images/${product.image_url}`} alt={product.title} />
                  <h4>{product.title}</h4>
                  <p>ID: {product.id}</p>
                  <p>Precio: {product.price}</p>
                  <p>Inventario: {product.quantity}</p>
                  <div className="product-actions">
                    <button>-</button>
                    <input type="number" defaultValue="1" />
                    <button>+</button>
                    <button className="add-to-cart">Añadir al carrito</button>
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
