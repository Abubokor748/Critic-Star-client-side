import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PrivateRoute from '../../router/PrivateRoute';
import { FaArrowRight, FaBuilding, FaTag, FaMoneyBillWave, FaExternalLinkAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const ServiceDetails = () => {
    const { _id, serviceImage, serviceTitle, companyName, website, description, category, price } = useLoaderData();

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Critic Star | Service Details</title>
            </Helmet>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl">
                <figure className="relative overflow-hidden">
                    <img
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105 p-5 rounded-lg"
                        src={serviceImage}
                        alt={serviceTitle}
                    />
                </figure>

                <div className="p-8 space-y-6">
                    <div className="border-b pb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">{serviceTitle}</h1>
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                        >
                            <span className="mr-2">Visit Company Website</span>
                            <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FaTag className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-lg font-semibold">{category}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <FaBuilding className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Company</p>
                                <p className="text-lg font-semibold">{companyName}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-100 rounded-lg">
                                <FaMoneyBillWave className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-lg font-semibold">${price}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900">Service Description</h3>
                        <p className="text-gray-600 leading-relaxed">{description}</p>
                    </div>

                    <PrivateRoute>
                        <div className="pt-6 border-t">
                            <Link
                                to={`/write_review/${_id}`}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                            >
                                <span>Write a Review</span>
                                <FaArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </div>
                    </PrivateRoute>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;