import React from 'react';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function AllProductList() {
     const [products, setProducts] = useState([]);
     const navigate = useNavigate();

     const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8800/server/product/get_all_products`
            );
            setProducts(response.data);
        } catch (error) {
            console.error(
                "Error fetching products:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
            
                fetchProducts();
            
        });
     
  return (
    <div>
      <main className="p-8 mt-10 sm:mt-14">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-700">Products for Category</h1>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => navigate(-1)}
                        >
                            Back to Categories
                        </button>
                        
                    </div>
                </div>

                {/* Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                        >
                            <img
                                src={`http://localhost:8800/${product.logo}`}
                                alt="Product Logo"
                                className="w-full h-90 object-cover p-4"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {product.products_name}
                                </h2>
                                <p className="text-gray-600 text-sm mt-2">
                                    {product.product_detail}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                    Category: {product.category_name}
                                </p>
                                <p className="text-gray-700 font-bold mt-3" style={{color:"rgb(0 121 107)"}}>
                                    ₹ {product.product_amount}
                                </p>
                                
                            </div>
                        </div>
                    ))}
                </div>
                

            </main>
    </div>
  )
}

export default AllProductList
