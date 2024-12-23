import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import { getProduct, subscribeProduct } from "../api/api";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [subscribed, setSubscribed] = useState(new Set());
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchProducts();
    const userOnline = JSON.parse(localStorage.getItem("user"));
    setUserId(userOnline.id);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProduct();

      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleSubscribe = async (productId) => {
    let userData = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await subscribeProduct(userData.id, productId);

      if (response.ok) {
        setSubscribed((prev) => new Set(prev).add(productId));
        alert("Successfully subscribed to the product!");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error subscribing to product:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold">${product.price}</span>
                <button
                  onClick={() => handleSubscribe(product._id)}
                  className={`py-2 px-4 rounded text-white ${
                    product.subscribers.includes(userId)
                      ? "bg-green-500"
                      : "bg-blue-500"
                  }`}
                >
                  {product.subscribers.includes(userId)
                    ? "Subscribed"
                    : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
