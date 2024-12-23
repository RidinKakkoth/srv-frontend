
import React from 'react';
import { deleteProduct,  } from '../api/api';

const ProductTable = ({fetchProducts,products,isModalOpen, setIsModalOpen,setSelectedProduct}) => {


  const handleDelete = async (id) => {
    try {


      const response = await deleteProduct(id)
      if (response.success) {
        fetchProducts(); 
      }
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleEdit = (product) => {
    
    setSelectedProduct(product); 
    setIsModalOpen(true); 
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Products List</h2>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">{product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </td>
              <td className="px-4 py-2 flex gap-2">
                <button
                  className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition"
                  onClick={() => handleEdit(product)} 
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
