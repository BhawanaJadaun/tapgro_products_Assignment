import { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading products...</h2>;
  }

  if (error) {
    return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p className="price">₹ {product.price}</p>
          <p className="category">{product.category}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
