import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const EditProduct = ({ isOpen, onClose, product, refresh }) => {
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [product_amount, setPrice] = useState("");

  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      console.log("Current Product:", product); // Debugging the product object
      document.addEventListener("mousedown", handleClickOutside);
      if (product) {
        setProductName(product.products_name || ""); // Corrected key: products_name
        setProductDetail(product.product_detail || "");
        setPrice(product.product_amount || ""); // Corrected key: product_amount
      }
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, product]);

  const handleProductEdit = async (e) => {
    e.preventDefault();
  
    if (!product || !product.id) {
      console.error("Product is undefined or missing an ID.");
      return;
    }
  
    try {
      await axios.post("http://localhost:8800/server/product/edit_product", {
        product_id: product.id, // Ensure it matches with backend
        products_name: productName, // Ensure it matches with backend
        product_detail: productDetail, // Ensure it matches with backend
        product_amount: product_amount,
      });
      
      onClose();
      refresh(); // Refresh the product list after editing
    } catch (error) {
      console.error("Error updating product", error);
      alert("Error updating product");
    }
  };
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
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
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form className="space-y-4" onSubmit={handleProductEdit}>
          <div>
            <label className="block">
              <span className="text-gray-700">Product Name</span>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Product Detail</span>
              <textarea
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter product detail"
                value={productDetail}
                onChange={(e) => setProductDetail(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Price</span>
              <input
                type="number"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter price"
                value={product_amount}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-teal-500 text-white py-2 rounded"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
