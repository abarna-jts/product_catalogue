import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AllCategoryList() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const fetchCategory = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8800/server/category/get_all_category`
            );
            setCategories(response.data);
        } catch (error) {
            console.error(
                "Error fetching category:",
                error.response?.data?.message || error.message
            );
        }
    };

    useEffect(() => {
               
        fetchCategory();
               
    });

  return (
    <div>
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
                    
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Category Name</th>
                            <th className="py-3 px-6 text-left">Product</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-b hover:bg-teal-100">
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{category.category_name}</td>
                                <td className="py-3 px-6 text-left">
                                    <button className="bg-green-600 hover:bg-teal-700 text-white px-3 py-1 rounded mr-2"
                                     onClick={() => navigate('/category_products', { state: { categoryId: category.id } })}
                                    >View Products

                                    </button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </main>
    </div>
  )
}

export default AllCategoryList
