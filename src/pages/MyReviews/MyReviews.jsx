import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
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
        fetch(`http://localhost:5000/reviews?email=${user?.email}`)
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
                fetch(`http://localhost:5000/reviews/${id}`, {
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
        <div className="p-6">
            <Helmet>
                <title>Critic Star | My Reviews</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">My Reviews</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Review</th>
                            <th>Rating</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myReviews.map((review) => (
                            <tr key={review._id}>
                                <td>{review.serviceTitle}</td>
                                <td className="max-w-xs">{review.textReview}</td>
                                <td>
                                    <div className="flex items-center">
                                        {review.rating}/5
                                    </div>
                                </td>
                                <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(review._id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {myReviews.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        You have not written any reviews yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyReviews;