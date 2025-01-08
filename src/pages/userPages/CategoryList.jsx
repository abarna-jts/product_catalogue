// pages/Categories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCategory from "../../components/user/CreateCategory";
import { useLocation, useNavigate } from 'react-router-dom';
import EditCategory from '../../components/user/EditCategory';
import DeleteCategory from '../../components/user/DeleteCategory';

const Categories = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { catalogueId } = location.state || {};
    const [categories, setCategories] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const getCategories = async () => {
        try {
            const response = await axios.get('/category/get_categories', {
                params: { catalogueId: catalogueId },
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
            alert('Failed to fetch categories.');
        }
    };

    useEffect(() => {
        if (catalogueId) {
            getCategories();
        }
    }, [catalogueId])


    return (
        <main className="p-8 mt-10 sm:mt-14">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-700">Categories</h1>
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
                        Add New Category
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Category Name</th>
                            <th className="py-3 px-6 text-left">Catalogue Name</th>
                            <th className="py-3 px-6 text-left">Product</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-b hover:bg-teal-100">
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{category.category_name}</td>
                                <td className="py-3 px-6 text-left">{category.catalogue_name}</td>
                                <td className="py-3 px-6 text-left">
                                    <button className="bg-green-600 hover:bg-teal-700 text-white px-3 py-1 rounded mr-2"
                                     onClick={() => navigate('/category_products', { state: { categoryId: category.id } })}
                                    >View Products

                                    </button>
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => {
                                            setCurrentCategory(category);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setCurrentCategory(category);
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
                <CreateCategory
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    catalogueId={catalogueId}
                    refresh={getCategories}
                />
            )}

            {isEditModalOpen && (
                <EditCategory
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    category={currentCategory}
                    refresh={getCategories}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteCategory
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    categoryId={currentCategory.id}
                    refresh={getCategories}
                />
            )}
        </main>
    );
};

export default Categories;
