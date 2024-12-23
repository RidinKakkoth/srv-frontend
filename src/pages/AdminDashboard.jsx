import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import AddProduct from "../components/AddProduct";
import { getProduct } from "../api/api";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProduct();
      setProducts(response.products);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="mb-4 mt-5 ml-2 bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
      >
        Add New Product
      </button>
      <ProductTable
        fetchProducts={fetchProducts}
        products={products}
        setSelectedProduct={setSelectedProduct}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <AddProduct
            fetchProducts={fetchProducts}
            closeModal={closeModal}
            product={selectedProduct}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
