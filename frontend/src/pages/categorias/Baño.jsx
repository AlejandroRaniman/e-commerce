import React, { useEffect, useState } from 'react';
import { getProductsByCategory } from '../../api/apiClient';

const Baño = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProductsByCategory('baño');
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Productos para el Baño</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Precio: ${product.price}</p>
            {product.image_url && <img src={product.image_url} alt={product.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Baño;
