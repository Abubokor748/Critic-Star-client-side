import React, { useEffect, useState } from 'react';
import HotServiceCard from './HotServiceCard';

const HotServices = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://assignment-11-backend-seven.vercel.app/services')
        // fetch('https://assignment-11-backend-seven.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    } , [])

    return (
        <div className='mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='relative text-center mb-12'>
                <h2 className='text-4xl font-extrabold inline-block bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent drop-shadow-md'>
                    Spotlight Services
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-300 rounded-full mt-2"></span>
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-500">
                    Most Popular Choices
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {services.slice(-6).map(service => (
                    <HotServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default HotServices;