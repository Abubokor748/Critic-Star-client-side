import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import PrivateRoute from '../../router/PrivateRoute';
import { FaArrowRight, FaBuilding, FaTag, FaMoneyBillWave, FaExternalLinkAlt } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const ServiceDetails = () => {
    const { _id, serviceImage, serviceTitle, companyName, website, description, category, price } = useLoaderData();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Critic Star | Service Details</title>
            </Helmet>
            
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                {/* Image Section */}
                <div className="relative h-96 overflow-hidden group">
                    <img
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        src={serviceImage}
                        alt={serviceTitle}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    <div className="absolute bottom-6 left-6">
                        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                            {serviceTitle}
                        </h1>
                        <a
                            href={website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center mt-2 text-white/90 hover:text-white transition-colors duration-200"
                        >
                            <span className="mr-2">Visit Company Website</span>
                            <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 space-y-8">
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Category Card */}
                        <div className="flex items-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <FaTag className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Category</p>
                                <p className="text-lg font-semibold text-gray-800">{category}</p>
                            </div>
                        </div>

                        {/* Company Card */}
                        <div className="flex items-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <FaBuilding className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Company</p>
                                <p className="text-lg font-semibold text-gray-800">{companyName}</p>
                            </div>
                        </div>

                        {/* Price Card */}
                        <div className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <FaMoneyBillWave className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="text-lg font-semibold text-gray-800">${price}</p>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Service Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {description}
                        </p>
                    </div>

                    {/* CTA Section */}
                    <PrivateRoute>
                        <div className="pt-8 border-t border-gray-100">
                            <Link
                                to={`/write_review/${_id}`}
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                            >
                                <span>Write a Review</span>
                                <FaArrowRight className="ml-3 w-5 h-5" />
                            </Link>
                        </div>
                    </PrivateRoute>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;