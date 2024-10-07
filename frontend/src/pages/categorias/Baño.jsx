import React, { useEffect, useState } from 'react';
import '../../styles/categorias/Baño.css';

const Baño = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  // Obtener los productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Filtrar productos para la categoría "Baño"
      const categoryProducts = data.filter(
        product => Array.isArray(product.categories) && product.categories.includes('Baño')
      );
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Manejar el cambio de filtro
  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredProducts(
      products.filter(product =>
        product.title.toLowerCase().includes(value) ||
        product.categories.some(cat => cat.toLowerCase().includes(value))
      )
    );
  };

  return (
    <div className="container">
      {/* Filtros laterales */}
      <aside className="filter-sidebar">
        <div className="container-filter">
          <h3>Filtros</h3>
          <a href="#" class name="#">Limpiar Filtros</a>
        </div>
        <div className="filter-group">
          <h4>Productos</h4>
          <ul>
            {/* Aquí puedes agregar más filtros, por ejemplo, por precio o por categorías */}
            <li>
              <input type="checkbox" name="filter1" /> Opción 1
            </li>
            <li>
              <input type="checkbox" name="filter2" /> Opción 2
            </li>
          </ul>
        </div>
      </aside>

      {/* Productos */}
      <div className="product-section">
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.title} />
                <h4>{product.title}</h4>
                <p>ID: {product.id}</p>
                <p>价格: {product.price}</p>
                <p>库存: {product.quantity}</p>
                <div className="product-actions">
                  <button>-</button>
                  <input type="number" defaultValue="1" />
                  <button>+</button>
                  <button className="add-to-cart">Añadir al carrito</button>
                </div>
              </div>
            ))
          ) : (
            <p>没有找到商品。</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Baño;
