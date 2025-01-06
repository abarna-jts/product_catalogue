import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CreateProduct = ({ isOpen, onClose, refresh }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    products_name: '',
    product_detail: '',
    product_amount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/server/product/create_product", formData);
      alert('Product added successfully!');
      setFormData({ products_name: '', product_detail: '', product_amount: '' });
      
      onClose();
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        refresh();
        onClose();
        
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[40vw] max-h-[90vh] overflow-auto mx-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-gray-500 text-2xl hover:text-gray-800"
          >
            &times;
          </button>

          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <label className="block w-full p-1">
                <span className="text-gray-700">Product Name</span>
                <input
                  type="text"
                  name="products_name"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Product Name"
                  value={formData.products_name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block w-full p-1">
                <span className="text-gray-700">Product Details</span>
                <input
                  type="text"
                  name="product_detail"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Product Details"
                  value={formData.product_detail}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="block w-full p-1">
                <span className="text-gray-700">Price</span>
                <input
                  type="number"
                  name="product_amount"
                  className="w-full p-2 border rounded mt-1"
                  placeholder="Enter Price"
                  value={formData.product_amount}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-teal-500 text-white py-2 rounded"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
