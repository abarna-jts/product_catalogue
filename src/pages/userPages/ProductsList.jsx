// pages/Categories.js
import React, { useState } from 'react';
import Modal from '../../components/Modal';

const Categories = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const handleCreateCategory = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <main className="p-8 mt-10 sm:mt-14">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-700">Categories</h1>
                <button
                    onClick={handleCreateCategory}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Create Category
                </button>
            </div>
            <div className="bg-white shadow overflow-hidden rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {categories.map((category, index) => (
                        <li key={index} className="p-4">
                            {category.name}
                        </li>
                    ))}
                </ul>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
                <form>
                    <label className="block mb-2">
                        <span className="text-gray-700">Category Name</span>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mt-1"
                            placeholder="Enter category name"
                        />
                    </label>
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
                    >
                        Save
                    </button>
                </form>
            </Modal>
        </main>
    );
};

export default Categories;
