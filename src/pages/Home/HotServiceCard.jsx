import React from 'react';
import { Link } from 'react-router-dom';

const HotServiceCard = ({ service }) => {
    const { _id, serviceImage, serviceTitle, price, category, companyName } = service;

    return (
        <div className="group relative mx-auto w-full max-w-[350px] lg:max-w-none overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <div className="relative h-60 overflow-hidden">
                <img 
                    src={serviceImage}
                    alt={serviceTitle}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="inline-block rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white">
                        {category}
                    </span>
                </div>
            </div>
            
            <div className="p-6">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{serviceTitle}</h3>
                    <p className="text-gray-500 mt-1">{companyName}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="text-2xl font-bold text-purple-600">${price}</span>
                    </div>
                    <Link 
                        to={`/services/${_id}`}
                        className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-600 hover:shadow-lg"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotServiceCard;