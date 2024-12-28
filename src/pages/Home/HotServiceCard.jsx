import React from 'react';
import { Link } from 'react-router-dom';

const HotServiceCard = ({ service }) => {
    const { _id ,serviceImage, serviceTitle, price, category, companyName } = service;

    return (
        <div className="card card-compact mx-auto bg-base-100 w-96 p-3 shadow-xl">
            <figure>
                <img className='p-2 rounded-3xl'
                    src={serviceImage}
                    alt={serviceTitle} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Service Name: {serviceTitle}</h2>
                <p className="text-lg text-gray-700">Category: {category}</p>
                <p className="text-lg text-gray-700">Company Name: {companyName}</p>
                <p className="text-lg text-gray-700">Price: ${price}</p>
                <div className="card-actions justify-end">
                    <Link to={`/services/${_id}`}>
                        <button className="btn text-white bg-gray-800">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HotServiceCard;


