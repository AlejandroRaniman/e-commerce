import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/categorias/Categoria.css'; // Estilo adecuado según la categoría
import { useCart } from '../../context/CartContext'; // Importar el contexto del carrito

const Categoria = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart(); // Usar la función para añadir al carrito desde el contexto

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error al cargar los productos.');
    }
  };

  const handleAddToCart = (product, quantity) => {
    addToCart(product, quantity); // Usar la función del carrito desde el contexto
  };

  return (
    <div className="container">
      <aside className="filter-sidebar">
        <div className="container-filter">
          <h3>Filtros</h3>
          <a href="#" onClick={() => setFilteredProducts(products)} className="clear-filters">
            Limpiar filtros
          </a>
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
                  <p>Precio: {product.price}</p>
                  <input
                    type="number"
                    defaultValue="1"
                    id={`quantity-${product.id}`}
                  />
                  <button
                    onClick={() => {
                      const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value);
                      handleAddToCart(product, quantity); // Llamar a la función para añadir al carrito
                    }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              ))
            ) : (
              <p>No se encontraron productos en esta categoría.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categoria;
