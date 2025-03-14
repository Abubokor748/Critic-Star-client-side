import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaTrash, FaStar, FaRegStar, FaSadTear } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetchReviews();
        }
    }, [user?.email]);

    const fetchReviews = () => {
        fetch(`https://assignment-11-backend-seven.vercel.app/reviews?email=${user?.email}`)
            .then((res) => res.json())
            .then((data) => setMyReviews(data))
            .catch((error) => console.error("Error fetching user reviews:", error));
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-11-backend-seven.vercel.app/reviews/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data?.deletedCount) {
                            Swal.fire("Deleted!", "Your review has been deleted.", "success");
                            fetchReviews();
                        }
                    });
            }
        });
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50 p-6 md:p-10">
            <Helmet>
                <title>Critic Star | My Reviews</title>
            </Helmet>

            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                        My Reviews
                    </h2>
                    <p className="mt-3 text-lg text-gray-600">
                        Your recent feedback and ratings
                    </p>
                </div>

                {myReviews.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-full">
                            <FaSadTear className="text-6xl text-purple-500 mx-auto mb-4" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-800 mt-6">
                            No Reviews Found
                        </h3>
                        <p className="text-gray-600 mt-2">
                            You haven't submitted any reviews yet
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                        {myReviews.map((review) => (
                            <div key={review._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {review.serviceTitle}
                                        </h3>
                                        <p className="text-gray-600 italic mb-4">
                                            "{review.textReview}"
                                        </p>
                                    </div>

                                    <div className="w-full md:w-auto flex flex-col gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex text-purple-500">
                                                {[...Array(5)].map((_, index) => (
                                                    <span key={index} className="text-lg">
                                                        {index < review.rating ? (
                                                            <FaStar />
                                                        ) : (
                                                            <FaRegStar className="opacity-50" />
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-gray-600 font-medium">
                                                ({review.rating}/5)
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.reviewDate).toLocaleDateString('en-US', {
                                                    weekday: 'short',
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="btn btn-error btn-outline btn-sm hover:bg-red-600 hover:text-white transition-colors"
                                            >
                                                <FaTrash className="mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyReviews;