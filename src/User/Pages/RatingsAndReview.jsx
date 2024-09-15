
import React, { useState } from 'react';
import axios from 'axios';

// StarRating Component
const StarRating = ({ rating, onChange }) => {
    const handleClick = (value) => {
        onChange(value);
    };

    return (
        <div className="flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-6 h-6 cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    onClick={() => handleClick(star)}
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.9L12 15.77l-6.18 3.27L7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
};

// ReviewPage Component
const ReviewPage = ({ stationId, userId }) => {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send userId and stationId along with rating and reviewText
            await axios.post('http://localhost:1000/Rating/register', {
                user: { id: userId },  // Sending user ID in the payload
                chargingStation: { id: stationId },  // Sending station ID in the payload
                rating,
                reviewText
            });
            setRating(1);
            setReviewText('');
            setSuccessMessage('Review submitted successfully!');
            setError(null);
        } catch (err) {
            setError('Failed to submit review.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Leave a Review for Charging Station {stationId}</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">Rating:</label>
                        <StarRating rating={rating} onChange={setRating} />
                    </div>
                    <div>
                        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">Review:</label>
                        <textarea
                            id="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows="4"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewPage;
