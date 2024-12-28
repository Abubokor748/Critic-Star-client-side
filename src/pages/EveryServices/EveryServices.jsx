import React, { useEffect, useState } from 'react';
import HotServiceCard from '../Home/HotServiceCard';

const EveryServices = () => {

    const [services, setServices] = useState([]);
    
        useEffect(() => {
            fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
        } , [])

    return (
        <div className='my-5 mx-auto'>
            <h2 className='text-3xl font-bold text-center my-3'>All Services</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto'>
                {
                    services.map(service => <HotServiceCard key={service._id} service={service}></HotServiceCard>)
                }
            </div>
            
        </div>
    );
};

export default EveryServices;