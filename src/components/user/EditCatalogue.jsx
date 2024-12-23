import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';

const EditCatalogue = ({ isOpen, onClose, catalogue, refresh }) => {

    const [catalogueName, setCatalogueName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [aboutCompany, setAboutCompany] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [logo, setLogo] = useState(null);
    const [emailAddress, setEmailAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');

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
        if (catalogue) {
            setCatalogueName(catalogue.catalogue_name || '');
            setCompanyName(catalogue.company_name || '');
            setAboutCompany(catalogue.about_company || '');
            setCompanyAddress(catalogue.company_address || '');
            setEmailAddress(catalogue.email_address || '');
            setContactNumber(catalogue.contact_number || '');
            setLogo(null);
        }
    }, [catalogue]);

    if (!isOpen) return null;

    const handleCatalogueEdit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('catalogueName', catalogueName);
        formData.append('companyName', companyName);
        formData.append('aboutCompany', aboutCompany);
        formData.append('companyAddress', companyAddress);
        formData.append('emailAddress', emailAddress);
        formData.append('contactNumber', contactNumber);
        if (logo) formData.append('logo', logo);

        try {
            await axios.put(`/catalogue/edit_catalogue/${catalogue.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onClose();
            refresh();
        } catch (error) {
            console.error('Error updating catalogue:', error);
            alert('Failed to update the catalogue.');
        }
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
                <h2 className="text-xl font-semibold mb-4">Edit Catalogue</h2>
                <form className="space-y-4" onSubmit={handleCatalogueEdit}>
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
    )
};

export default EditCatalogue