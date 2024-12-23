import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

const EditCategory = ({ isOpen, onClose, category, refresh }) => {

  const [categoryName, setCategoryName] = useState('');

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

  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name || '');
    }
  }, [category]);

  const handleCategoryEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/category/edit_category', {
        categoryId: category.id,
        categoryName
      });

      onClose();
      refresh();

    } catch (error) {
      console.error('Error updating category', error);
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
        <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
        <form className="space-y-4" onSubmit={handleCategoryEdit}>
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
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditCategory