import { useState, useEffect } from "react";
import React from 'react';
import CreateProduct from "../../components/user/CreateProduct";
import EditProduct from '../../components/user/EditProduct';
import DeleteProduct from '../../components/user/DeleteProduct';
import {useNavigate } from 'react-router-dom';
import axios from "axios";

function ProductList() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const navigate = useNavigate();

    
        const fetchProducts = async () => {
          try {
            const response = await axios.get("http://localhost:8800/server/product/get_products");
            setProducts(response.data);
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        useEffect(() => {
            fetchProducts();
        }, []);

        

    return (
        <div>
            <main className="p-8 mt-10 sm:mt-14">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-700">Products</h1>
                    <div className='flex'>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            onClick={() => navigate('/catalogues')}
                        >
                            Go to Catalogue List
                        </button>
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg ml-4"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            Add New Products
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">S.No</th>
                                <th className="py-3 px-6 text-left">Products Name</th>
                                <th className="py-3 px-6 text-left">Products Detail</th>
                                <th className="py-3 px-6 text-left">Price</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {products.map((product, index) => (
                                <tr key={product.id} className="border-b hover:bg-teal-100">
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{product.products_name}</td>
                                <td className="py-3 px-6 text-left">{product.product_detail}</td>
                                <td className="py-3 px-6 text-left">{product.product_amount}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                    onClick={() => {
                                        setCurrentProduct(product);
                                        setIsEditModalOpen(true);
                                    }}
                                    >
                                    Edit
                                    </button>
                                    <button
                                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    onClick={() => { setCurrentProduct(product);
                                        setIsDeleteModalOpen(true);
                                        
                                    }}
                                    >
                                    Delete
                                    </button>
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            {isCreateModalOpen && (
                <CreateProduct
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                />
            )}
            {isEditModalOpen && (
                <EditProduct
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                product={currentProduct} 
                refresh={fetchProducts}
              />
            )}
            {isDeleteModalOpen && (
                <DeleteProduct
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    productID={currentProduct.id}
                />
            )}
        </div>

        
    )
}

export default ProductList
