import React, { useContext, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const WriteAReview = () => {

    const { user } = useContext(AuthContext);

    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleAddReview = (e) => {
        e.preventDefault();

        const form = e.target;
        const textReview = form.textReview.value.trim();
        const reviewDate = new Date().toLocaleDateString(); // Auto-set the current date

        // Validations
        if (textReview.length < 10) {
            toast.error('Review must be at least 10 characters long!');
            return;
        }
        if (rating === 0) {
            toast.error('Please select a rating!');
            return;
        }

        const newReview = {
            textReview,
            rating,
            reviewDate: new Date(),
            user : {
                name: user?.name,
                photo: "user?.photoURL",
            },
        };

        // Save review in the database
        fetch('https://assignment-11-backend-seven.vercel.app/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReview),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Review added successfully',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });

                    // Reset form and rating
                    form.reset();
                    setRating(0);
                }
            });
    };

    return (
        <div className="p-6 bg-gray-100 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Your Review</h2>
            <form onSubmit={handleAddReview} className="space-y-4">
                {/* Textarea for review */}
                <div>
                    <label className="block font-medium mb-2">Your Review:</label>
                    <textarea
                        name="textReview"
                        className="w-full p-2 border rounded"
                        placeholder="Write your review here (at least 10 characters)"
                        rows="4"
                        required
                    ></textarea>
                </div>

                {/* Rating Selection */}
                <div>
                    <label className="block font-medium mb-2">Your Rating:</label>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        size={30}
                        allowHalfIcon
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Add Review
                </button>
            </form>
        </div>
    );
};

export default WriteAReview;
