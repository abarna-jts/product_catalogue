import React, { useEffect, useRef } from 'react'
import axios from 'axios';

const DeleteCatalogue = ({ isOpen, onClose, catalogueId, refresh }) => {

    const modalRef = useRef(null);
    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);


    if (!isOpen) return null;

    const handleCatalogueDelete = async (e) => {
        e.preventDefault();

        try {
            await axios.delete(`/catalogue/delete_catalogue/${catalogueId}`);
            alert('Catalogue deleted successfully!');
            onClose();
            refresh();
        } catch (error) {
            console.error("Error deleting catalogue:", error);
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

                <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this catalogue?</p>
                <div className="flex justify-end space-x-4 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCatalogueDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm"
                    >
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    )
};

export default DeleteCatalogue