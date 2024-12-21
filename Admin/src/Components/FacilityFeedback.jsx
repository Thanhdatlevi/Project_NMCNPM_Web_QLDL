import React, { useState, useEffect } from 'react';
import '../Styles/FacilityFeedback.css';
import { useParams } from 'react-router-dom';

const FacilityFeedback = () => {

    const { facilityId } = useParams();
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch feedbacks khi component mount
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(`/api/feedback/facility/${facilityId}`);
                const data = await response.json();
                setFeedbacks(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
                setError('Could not fetch feedbacks');
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [facilityId]);

    if (loading) {
        return <div>Loading feedbacks...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="facility-feedback">
            <div className="feedback-title">
                <h3>Feedback for Facility {facilityId}</h3>
            </div>
            <div className="feedback-list">
                {feedbacks.length === 0 ? (
                    <p>No feedbacks available for this facility.</p>
                ) : (
                    feedbacks.map((feedback) => (
                        <div className="feedback-item" key={feedback._id}>
                            <div className="feedback-details">
                                <strong>Rating:</strong> {feedback.rate} <br />
                                <strong>Details:</strong> {feedback.details} <br />
                                <strong>Tourist ID:</strong> {feedback.tourist_id} <br />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default FacilityFeedback;
