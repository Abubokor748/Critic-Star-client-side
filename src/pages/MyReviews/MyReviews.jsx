import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import ReviewCard from "../AllReviews/ReviewCard";

const MyReviews = () => {
    const { user } = useContext(AuthContext);
    const [myReviews, setMyReviews] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://assignment-11-backend-seven.vercel.app/reviews/user/${user.email}`)
                .then((res) => res.json())
                .then((data) => setMyReviews(data))
                .catch((error) =>
                    console.error("Error fetching user reviews:", error)
                );
        }
    }, [user?.email]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-4">My Reviews</h2>
            <div className="grid grid-cols-1 gap-4">
                {myReviews.length > 0 ? (
                    myReviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        You have not written any reviews yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default MyReviews;
