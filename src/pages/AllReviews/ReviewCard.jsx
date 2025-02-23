import React from "react";
import { FaStar, FaRegStar, FaTag, FaUser } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { name, photo, reviewDate, rating, textReview, serviceTitle } = review;
    
    return (
        <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-6">
            {/* Service Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 flex items-center">
                <FaTag className="text-white mr-2" />
                <span className="text-white font-semibold">{serviceTitle}</span>
            </div>

            {/* Card Content */}
            <div className="p-6">
                {/* User Info Section */}
                <div className="flex items-center mb-4">
                    <div className="relative">
                        {photo ? (
                            <img
                                src={photo}
                                alt="User"
                                className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <FaUser className="text-gray-500 text-xl" />
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <h3 className="font-semibold text-gray-800 text-lg">{name || "Anonymous User"}</h3>
                        <p className="text-gray-500 text-sm">
                            {new Date(reviewDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className="text-xl">
                                {index < rating ? <FaStar /> : <FaRegStar />}
                            </span>
                        ))}
                    </div>
                    <span className="ml-2 text-gray-600 font-medium">({rating}/5)</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-4 border-l-4 border-blue-500 pl-4 italic">
                    "{textReview}"
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;