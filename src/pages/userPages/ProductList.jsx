import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CreateProduct from "../../components/user/CreateProduct";
import EditProduct from "../../components/user/EditProduct";
import DeleteProduct from "../../components/user/DeleteProduct";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { categoryId } = location.state || {};

    // Move the fetchProducts function outside of useEffect
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8800/server/product/get_products?categoryId=${categoryId}`
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
        if (categoryId) {
            fetchProducts();
        } else {
            console.error("Category ID is missing!");
        }
    }, [categoryId]);

    return (
        <div>
            <main className="p-8 mt-10 sm:mt-14">
                <div className="flex justify-between">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-700">Products for Category</h1>
                    
                </div>
                <div className="flex mb-4 items-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate(-1)} // Go back to the previous page
                    >
                        Back to Categories
                    </button>
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg ml-4"
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        Add New Product
                    </button>
                </div>
                </div>
                
                
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">S.No</th>
                                <th className="py-3 px-6 text-left">Product Name</th>
                                <th className="py-3 px-6 text-left">Product Detail</th>
                                <th className="py-3 px-6 text-left">Category Name</th>
                                <th className="py-3 px-6 text-left">Price</th>
                                <th className="py-3 px-6 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                            {products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-teal-100"
                                >
                                    <td className="py-3 px-6 text-left">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">{product.products_name}</td>
                                    <td className="py-3 px-6 text-left">{product.product_detail}</td>
                                    <td className="py-3 px-6 text-left">{product.category_name}</td>
                                    <td className="py-3 px-6 text-left">{product.product_amount}</td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setIsEditModalOpen(true);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                            onClick={() => {
                                                setSelectedProduct(product);
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
                {isCreateModalOpen && (
                    <CreateProduct
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        categoryId={categoryId}
                    />
                )}
                {isEditModalOpen && (
                    <EditProduct
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        product={selectedProduct}
                        refresh={fetchProducts} // Refresh product list after edit
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteProduct
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        productID={selectedProduct?.id}
                        refresh={fetchProducts} // Refresh product list after delete
                    />
                )}
            </main>
        </div>
    );
};

export default ProductList;
