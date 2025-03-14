import React from "react";
import { FaStar, FaRegStar, FaCube, FaUser } from "react-icons/fa";

const ReviewCard = ({ review }) => {
    const { name, photo, reviewDate, rating, textReview, serviceTitle } = review;
    
    return (
        <div className="max-w-2xl mx-auto bg-slate-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-6 group my-4 mx-4 sm:mx-6"> {/* Added horizontal margins */}
            {/* Service Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 flex items-center relative">
                {/* Full-width background extension */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 -translate-x-full left-[calc(100%+1px)]"></div>
                <FaCube className="text-white/80 mr-3 text-lg z-10" />
                <span className="text-white font-semibold tracking-wide z-10">{serviceTitle}</span>
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
                                className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center shadow-md">
                                <FaUser className="text-white text-lg" />
                            </div>
                        )}
                    </div>
                    <div className="ml-4">
                        <h3 className="font-semibold text-gray-800 text-lg">{name || "Anonymous User"}</h3>
                        <p className="text-gray-500 text-sm">
                            {new Date(reviewDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                {/* Rating Section */}
                <div className="flex items-center mb-4">
                    <div className="flex text-purple-500 gap-1">
                        {[...Array(5)].map((_, index) => (
                            <span key={index} className="text-xl">
                                {index < rating ? <FaStar /> : <FaRegStar className="opacity-70" />}
                            </span>
                        ))}
                    </div>
                    <span className="ml-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent font-semibold">
                        ({rating}/5)
                    </span>
                </div>

                {/* Review Text */}
                <div className="relative pl-6">
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-400 rounded-full"></div>
                    <p className="text-gray-700 leading-relaxed italic">
                        "{textReview}"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;