import React, { useEffect, useState } from 'react';
import ReviewCard from '../AllReviews/ReviewCard';

const HotReviews = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
        // fetch('http://localhost:5000/reviews')
        .then(res => res.json())
        .then(data => setReviews(data))
    } , [])

    return (
        <div className='mt-10 mb-10 mx-auto'>
            <h2 className='text-3xl font-bold text-center my-5'>Featured Reviews</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto'>
                {
                    reviews.slice(-6).map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default HotReviews;