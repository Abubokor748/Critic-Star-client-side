import React, { useEffect, useState } from 'react';
import HotServiceCard from './HotServiceCard';

const HotServices = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('https://assignment-11-backend-seven.vercel.app/services')
        .then(res => res.json())
        .then(data => setServices(data))
    } , [])

    return (
        <div className='mt-5 mx-auto'>
            <h2 className='text-3xl font-bold text-center my-5'>Featured Services</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto'>
                {
                    services.slice(-6).map(service => <HotServiceCard key={service._id} service={service}></HotServiceCard>)
                }
            </div>
            
        </div>
    );
};

export default HotServices;