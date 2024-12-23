import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const CreateCategory = ({ isOpen, onClose, catalogueId, refresh }) => {
    const [catalogue, setCatalogue] = useState({});
    const [categoryName, setCategoryName] = useState('');

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        const getCatalogues = async () => {
            try {
                const response = await axios.get('/catalogue/get_catalogue_by_id', {
                    params: { catalogue_id: catalogueId },
                });
                setCatalogue(response.data[0]);
            } catch (error) {
                console.error('Error fetching catalogues:', error);
            }
        };

        if (isOpen) {
            getCatalogues();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCategoryCreate = async (e) => {
        e.preventDefault();

        if (!categoryName) {
            alert('Please enter a category name.');
            return;
        }

        try {
            const response = await axios.post('/category/create_category', {
                catalogueId: catalogue.id,
                categoryName,
            });

            if (response.status === 201) {
                alert('Category created successfully!');
                onClose(); // Close the modal
                refresh();
            } else {
                console.error('Error creating catalogue');
            }
        } catch (error) {
            console.error('Error creating category:', error);
            alert('Failed to create category.');
        }
    };

    return (
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

                <h2 className="text-xl font-semibold mb-4">Add New Category in {catalogue.catalogue_name}</h2>
                <form className="space-y-4" onSubmit={handleCategoryCreate}>
                    <div className="flex justify-center">
                        <label className="block w-full p-1">
                            <span className="text-gray-700">Category Name</span>
                            <input
                                type="text"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter Category name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
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
    );
};

export default CreateCategory;
