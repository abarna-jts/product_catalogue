import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const CreateCatalogue = ({ isOpen, onClose, setCatalogues }) => {
    const [catalogueName, setCatalogueName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [aboutCompany, setAboutCompany] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [logo, setLogo] = useState(null);
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const { currentUser } = useContext(AuthContext);
    const catalogueOwnerId = currentUser.id;

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

    if (!isOpen) return null;

    const handleCatalogueCreate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('catalogueOwnerId', catalogueOwnerId);
        formData.append('catalogueName', catalogueName);
        formData.append('companyName', companyName);
        formData.append('aboutCompany', aboutCompany);
        formData.append('companyAddress', companyAddress);
        formData.append('emailAddress', emailAddress);
        formData.append('contactNumber', contactNumber);
        if (logo) {
            formData.append('logo', logo);
        }

        try {
            const response = await axios.post('/catalogue/create_catalogue', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log('Catalogue created successfully!');
                onClose();
                clearForm();

                // Fetch updated catalogues list
                const updatedCatalogues = await axios.get('/catalogue/get_catalogues', {
                    params: { ownerId: catalogueOwnerId },
                });
                setCatalogues(updatedCatalogues.data);
            } else {
                console.error('Error creating catalogue');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const clearForm = () => {
        setCatalogueName('');
        setCompanyName('');
        setAboutCompany('');
        setCompanyAddress('');
        setLogo(null);
        setEmailAddress('');
        setContactNumber('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-[70vw] max-h-[90vh] overflow-auto mx-auto relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-500 text-2xl hover:text-gray-800"
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4">Create New Catalogue</h2>
                <form className="space-y-4" onSubmit={handleCatalogueCreate}>
                    <div className="flex">
                        <label className="block w-full sm:w-1/2 p-1">
                            <span className="text-gray-700">Catalogue Name</span>
                            <input
                                type="text"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter catalogue name"
                                value={catalogueName}
                                onChange={(e) => setCatalogueName(e.target.value)}
                                required
                            />
                        </label>
                        <label className="block w-full sm:w-1/2 p-1">
                            <span className="text-gray-700">Company Name</span>
                            <input
                                type="text"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter company name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className='flex'>
                        <label className="block w-full sm:w-1/2 p-1">
                            <span className="text-gray-700">About Company</span>
                            <textarea
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Brief about the company"
                                rows="2"
                                value={aboutCompany}
                                onChange={(e) => setAboutCompany(e.target.value)}
                            ></textarea>
                        </label>

                        <label className="block w-full sm:w-1/2 p-1">
                            <span className="text-gray-700">Company Address</span>
                            <textarea
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter company address"
                                rows="2"
                                value={companyAddress}
                                onChange={(e) => setCompanyAddress(e.target.value)}
                            ></textarea>
                        </label>
                    </div>

                    <div className='flex'>
                        <label className="block w-full sm:w-1/3 p-1">
                            <span className="text-gray-700">Logo</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full p-1 border rounded mt-1"
                                onChange={(e) => setLogo(e.target.files[0])}
                            />
                        </label>

                        <label className="block w-full sm:w-1/3 p-1">
                            <span className="text-gray-700">Email Address</span>
                            <input
                                type="email"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter email address"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </label>

                        <label className="block w-full sm:w-1/3 p-1">
                            <span className="text-gray-700">Contact Number</span>
                            <input
                                type="tel"
                                className="w-full p-2 border rounded mt-1"
                                placeholder="Enter contact number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
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

export default CreateCatalogue;