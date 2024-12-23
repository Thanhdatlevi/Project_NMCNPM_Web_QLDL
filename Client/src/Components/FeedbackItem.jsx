import React from "react";
import { useState, useEffect } from "react";

const FeedbackItem = ({ facilityId }) => {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        fetch(`/feedback/getFeedBackByFaciltyId/${facilityId}`)
            .then(response => response.json())
            .then(data => setFeedbacks(data))
            .catch(error => console.error(error));
    }, [facilityId]);

    return (
        feedbacks.length > 0 && feedbacks.map(feedback => (
            <div className="Feedback-items">
                        <div className="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className="feedback-content">
                            <div className="feedback-title">
                                <div className="feedback-rating">
                                    <span className="rating-point">{feedback.rate} Amazing</span>
                                </div>
                                <div className="feedback-name">
                                    <p>{feedback.userFullname}</p>
                                </div>
                            </div>
                            <div className="feedback-comment">
                                <p>
                                    {feedback.detail}
                                </p>
                            </div>
                        </div>
                    </div>
        ))
    );

};

export default FeedbackItem;