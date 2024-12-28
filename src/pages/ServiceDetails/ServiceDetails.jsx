import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ServiceDetails = () => {

    const { _id, serviceImage, serviceTitle, companyName, website, description, category, price } = useLoaderData();

    // console.log(service);

    return (
        <div>
            <div className="mx-auto bg-base-100 p-3 shadow-xl">
                <figure>
                    <img className='p-2 rounded-3xl'
                        src={serviceImage}
                        alt={serviceTitle} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Service Name: {serviceTitle}</h2>
                    <h2 className="card-title">Service Name: 
                    <a href={website}>
                        <h2 className="card-title underline">Website Link</h2>
                    </a>
                    </h2>
                    <p className="text-lg text-gray-700">Category: <span className='font-semibold'>{category}</span></p>
                    <p className="text-lg text-gray-700">Company Name: <span className='font-semibold'>{companyName}</span></p>
                    <p className="text-lg text-gray-700">Description: <span className='font-semibold'>{description}</span></p>
                    <p className="text-lg text-gray-700">Price: <span className='font-semibold'>${price}</span> </p>
                    <div className="card-actions justify-end">
                        <Link to="/write_review">
                            <button className="btn text-white bg-gray-800">Write a Review</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;