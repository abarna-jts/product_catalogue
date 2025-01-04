import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import CreateCatalogue from '../../components/user/CreateCatalogue';
import EditCatalogue from '../../components/user/EditCatalogue';
import DeleteCatalogue from '../../components/user/DeleteCatalogue';
import { useNavigate } from 'react-router-dom';

const Catalogues = () => {
    const [catalogues, setCatalogues] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentCatalogue, setCurrentCatalogue] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const catalogueOwnerId = currentUser.id;
    const navigate = useNavigate();

    const getCatalogues = async () => {
        try {
            const response = await axios.get('/catalogue/get_catalogues', {
                params: { ownerId: catalogueOwnerId },
            });
            setCatalogues(response.data);
        } catch (error) {
            console.error('Error fetching catalogues:', error);
        }
    };

    useEffect(() => {
        getCatalogues();
    }, []);

    return (
        <main className="p-8 mt-10 sm:mt-14">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-700">Catalogues</h1>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg"
                >
                    Create Catalogue
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Catalogue Name</th>
                            <th className="py-3 px-6 text-left">Company Name</th>
                            <th className="py-3 px-6 text-left">Contact Number</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                            <th className='py-3 px-6 text-center'> Categories</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {catalogues.map((catalog, index) => (
                            <tr key={catalog.id} className="border-b hover:bg-teal-100">
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left">{catalog.catalogue_name}</td>
                                <td className="py-3 px-6 text-left">{catalog.company_name}</td>
                                <td className="py-3 px-6 text-left">{catalog.contact_number}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => {
                                            setCurrentCatalogue(catalog);
                                            setIsEditModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                                        onClick={() => {
                                            setCurrentCatalogue(catalog);
                                            setIsDeleteModalOpen(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className='py-3 px-6 text-center'>
                                    <button
                                        className='bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded'
                                        onClick={() => navigate('/categories', { state: { catalogueId: catalog.id } })}
                                    >
                                        Show Categories
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isCreateModalOpen && (
                <CreateCatalogue
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    setCatalogues={setCatalogues}
                />
            )}

            {isEditModalOpen && (
                <EditCatalogue
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    catalogue={currentCatalogue}
                    refresh={getCatalogues}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteCatalogue
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    catalogueId={currentCatalogue.id}
                    refresh={getCatalogues}
                />
            )}
        </main>
    );
};

export default Catalogues;
