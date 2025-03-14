import React, { useContext, useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaStar, FaRegStar } from 'react-icons/fa';


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
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Critic Star | Write A Review</title>
            </Helmet>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Write Your Review
                        </h2>
                        {service && (
                            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Reviewing: {service.serviceTitle}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    Company: {service.companyName}
                                </p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleAddReview} className="space-y-6">
                        {/* User Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                disabled
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-gray-50"
                            />
                        </div>

                        {/* Review Text */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Your Review
                            </label>
                            <textarea
                                name="textReview"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                placeholder="Share your experience (minimum 10 characters)"
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        {/* Rating */}
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WriteAReview;