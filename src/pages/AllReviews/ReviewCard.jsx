import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa"; // Import star icons

const ReviewCard = ({ review }) => {
    const { user, reviewDate, rating, textReview } = review;

    return (
        <div className="card border mx-auto bg-white w-96 p-4 shadow-lg rounded-lg">
            {/* User Info Section */}
            <div className="flex items-center gap-4">
                {/* User Avatar */}
                <img
                    src={user?.photo}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border"
                />
                {/* User Name & Date */}
                <div>
                    <h3 className="font-semibold text-lg">{user?.name || "User"}</h3>
                    <p className="text-gray-500 text-sm">{new Date(reviewDate).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Star Rating */}
            <div className="flex items-center mt-2 text-yellow-500">
                {Array.from({ length: 5 }).map((_, index) =>
                    index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
                )}
            </div>

            {/* Review Text */}
            <p className="text-gray-700 mt-3">{textReview}</p>
        </div>
    );
};

export default ReviewCard;
