import React from 'react';

const ReviewCard = ({ review }) => {

    const { _id, photo, reviewDate, rating, textReview } = review;

    return (
        <div>
            <div className="card border card-compact mx-auto bg-base-100 w-96 p-3 shadow-xl">
                <figure>
                    <img className='p-2 rounded-3xl'
                        src={photo}
                        alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Reviewed at: {reviewDate}</h2>
                    <p className="text-lg text-gray-700">Rating: {rating}</p>
                    <p className="text-lg text-gray-700">Review: {textReview}</p>
                </div>
            </div>
            
        </div>
    );
};

export default ReviewCard;