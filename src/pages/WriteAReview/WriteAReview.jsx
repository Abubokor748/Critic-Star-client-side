import React, { useContext, useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const WriteAReview = () => {
    const { user } = useContext(AuthContext);
    const [rating, setRating] = useState(0);
    const [service, setService] = useState(null);
    const { serviceId } = useParams();

    useEffect(() => {
        // Fetch service details when component mounts
        fetch(`https://assignment-11-backend-seven.vercel.app/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
            .catch(error => {
                console.error('Error fetching service:', error);
                toast.error('Failed to load service details');
            });
    }, [serviceId]);

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleAddReview = (e) => {
        e.preventDefault();

        const form = e.target;
        const textReview = form.textReview.value.trim();

        // Validations
        if (!serviceId) {
            toast.error('Invalid service!');
            return;
        }
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
            name: user?.displayName || 'User',
            photo: user?.photoURL || '',
            email: user?.email || '',
            serviceId: serviceId,
            serviceTitle: service?.serviceTitle || 'Unknown Service'
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
                    form.reset();
                    setRating(0);
                }
            })
            .catch(error => {
                console.error('Error submitting review:', error);
                toast.error('Failed to submit review');
            });
    };

    return (
        <div className="p-6 my-10 bg-gray-100 rounded-md max-w-2xl mx-auto">
            <Helmet>
                <title>Critic Star | Write A Review</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4 text-center">Add Your Review</h2>

            {service && (
                <div className="mb-6 p-4 bg-blue-50 rounded-md">
                    <h3 className="text-lg font-semibold">Reviewing: {service.serviceTitle}</h3>
                    <p className="text-sm">Company: {service.companyName}</p>
                </div>
            )}

            <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                    <label className="block font-medium mb-2">Your Name:</label>
                    <input
                        type="text"
                        value={user?.displayName || ''}
                        disabled
                        className="w-full p-2 border rounded bg-gray-50"
                    />
                </div>

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

                <div>
                    <label className="block font-medium mb-2">Your Rating:</label>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating}
                        size={30}
                        allowHalfIcon
                        className="rating-stars"
                    />
                    {rating > 0 && <span className="ml-2 text-gray-600"></span>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Add Review
                </button>
            </form>
        </div>
    );
};

export default WriteAReview;