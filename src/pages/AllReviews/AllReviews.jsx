import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Link } from 'react-router-dom';

const AllReviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('https://assignment-11-backend-seven.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <div className='my-5 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto'>
                {
                    reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
            <div className='my-3 mt-10'>
                <Link to="/write_review">
                    <button className='btn w-96 text-white bg-gray-800'>Write A Review?</button>
                </Link>
            </div>
        </div>
    );
};

export default AllReviews;