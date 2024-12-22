import React, { useEffect, useState } from 'react';
import '../Styles/ServicePage.css';
import { Link, useParams } from 'react-router-dom';
import Booking01 from './Booking-01';
const ServicePage = () => {

    const { idService } = useParams();
    const [service, setService] = useState([]);
    const [related_ser, setRelated_ser] = useState([]);
    const handleFetch = async () => {
        const typeService = idService.charAt(0);
        let type;
        if (typeService === 'h') type = "hotel"
        else if (typeService === 'r') type = "restaurant"
        else type = "attraction"
        try {
            const response = await fetch(`/${type}/${idService}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const detailData = await response.json();
            console.log(detailData);
            setService(detailData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        try {
            const response = await fetch(`/${type}/getRelated${type}/${idService}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const relatedData = await response.json();
            setRelated_ser(relatedData);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        handleFetch();
    }, []);

    const starClick = (event) => {
        const value = event.target.getAttribute('value');
        const stars = document.querySelectorAll('.fas');
        stars.forEach((star) => {
            star.style.color = 'black';
        });
        for (let i = stars.length; i >= value; i--) {
            stars[i - 1].style.color = 'gold';
        };
    }
    const SubmitFeedback = async () => {
        const stars = document.querySelectorAll('.fas');

        let rating = 0;

        for (let i = 0; i < stars.length; i++) {
            if (stars[i].style.color === 'gold') {
                rating = stars.length - i;
                break;
            }
        }

        const feedback_text = document.querySelector('.feedback-text').value;

        // send feedback to server
        console.log(rating, feedback_text);
        // Gửi yêu cầu POST lên server để lưu dữ liệu
        try {
            const response = await fetch('/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating,
                    feedback_text,
                    serviceId: idService, // Id của dịch vụ (có thể sử dụng idService từ useParams())
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            // Xử lý thành công
            alert('Feedback submitted successfully');

            // Reset lại các ngôi sao và textarea
            stars.forEach((star) => {
                star.style.color = 'black';
            });
            const feedback = document.querySelector('.feedback-text');
            feedback.value = '';

            // Đóng dialog feedback
            document.getElementById('dialog').classList.toggle('hidden');
        } catch (error) {
            console.error("Error submitting feedback:", error);
            alert('Error submitting feedback, please try again later.');
        }
    }
    return (

        <div className="detail-container">
            {service.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <section className="OverviewService" >
                    <div className="NameModel">
                        <div className="leftside">
                            <div className="Title">
                                <h1>{service.hotelName}</h1>
                            </div>
                            <div className="location">
                                <span className="location-icon">
                                    <i className='bx bx-map'></i>
                                    <p>{service.hotelLocation}</p>
                                </span>
                            </div>
                            <div className="rating">
                                <p>
                                    <span className="rating-point">{service.rating}</span>
                                    <strong className="Status">{service.deal}</strong>
                                    <span className="rating-total">8386 reviews</span>
                                </p>
                            </div>
                        </div>
                        <div className="rightside">
                            <div className="price">
                                <p><span className="price-tag">$240
                                </span>/night</p>
                            </div>
                            <div className="button-function">
                                <span className="icon">
                                    <i className='bx bx-heart'></i>
                                </span>
                                <span className="icon">
                                    <i className='bx bx-share-alt'></i>
                                </span>
                                <Link to="/booking01">
                                    <button className="book-now">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="Gallery">
                        <div className="main-pic">
                            <img src={service.attractionimage || service.hotelImages[0]} alt="pic1" />
                        </div>
                        <div className="sub-pic">
                            <img className="pic2" src={service.attractionimage || service.hotelImages[0]} alt="pic2" />
                            <img className="pic3" src={service.attractionimage || service.hotelImages[0]} alt="pic3" />
                        </div>
                    </div>
                    <section className='short-description'>
                        <div className="description-title">
                            <h3>Overview</h3>
                        </div>
                        <div className="description-content">
                            <p>
                                {service.description}
                            </p>

                        </div>
                    </section>
                </section>
            )}
            <div className="userrating-reviews">
                <div className="userrating-reviews-Title">
                    <h3>User Ratings & Reviews</h3>
                    <div className="feedback-button">
                        <p className="feedback" onClick={() => {
                            document.getElementById('dialog').classList.toggle('hidden');
                        }
                        }>Leave Feedback</p>
                    </div>
                </div>
                <div className="userrating-reviews-overviewRate">
                    <div className="total-rating">
                        <div className="rating-point">
                            <h2>4.5</h2>
                        </div>
                        <div className="rating-total">
                            <strong className="Status">Very good</strong>
                            <span className="rating-view"> 8386 reviews</span>
                        </div>
                    </div>
                    <div className="feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className="feature-info">
                            <p>Child Friendliness</p>
                            <p class="score">4.5</p>
                        </div>
                    </div>
                    <div className="feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className="feature-info">
                            <span>Location</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className="feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className="feature-info">
                            <span>Amenities</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className="feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className="feature-info">
                            <span>Hospitality</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className="feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className="feature-info">
                            <span>Food</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                </div>


                <div id="dialog" className="dialog hidden">
                    <div className="dialog-content">
                        <div className='feedback-container'>
                            <h3>Leave your feedback here</h3>
                            <div className="star-wrapper">
                                <span className="fas fa-star s1" value="1" onClick={(event) => starClick(event)}></span>
                                <span className="fas fa-star s2" value="2" onClick={(event) => starClick(event)}></span>
                                <span className="fas fa-star s3" value="3" onClick={(event) => starClick(event)}></span>
                                <span className="fas fa-star s4" value="4" onClick={(event) => starClick(event)}></span>
                                <span className="fas fa-star s5" value="5" onClick={(event) => starClick(event)}></span>
                            </div>

                            <textarea type="text" placeholder="Leave your feedback here" className='feedback-text' />
                            <div className="submit-feedback-container">
                                <p className="submit-feedback" onClick={() => SubmitFeedback()}>Submit</p>
                                <p className="cancel-feedback" onClick={() => { document.getElementById('dialog').classList.add('hidden') }}>Cancel</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="userrating-reviews-Feedback">
                    <div className="Feedback-items">
                        <div className="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className="feedback-content">
                            <div className="feedback-title">
                                <div className="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Feedback-items">
                        <div className="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className="feedback-content">
                            <div className="feedback-title">
                                <div className="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Feedback-items">
                        <div className="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className="feedback-content">
                            <div className="feedback-title">
                                <div className="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="Feedback-items">
                        <div className="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className="feedback-content">
                            <div className="feedback-title">
                                <div className="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="related">
                <h2>Related Facility</h2>
                <div id="related_container">
                    {related_ser.map((ser) => {
                        return (
                            <a href={`/servicepage/${ser.id || ser.id || ser.id}`} class="related_item">
                                <div class="box_item">
                                    <img src={ser.images} alt="" />
                                    <div className="content">
                                        <h3>{ser.name}</h3>
                                        <span class="desc">{ser.description}</span>
                                        <span class="desc"><i class="fa-solid fa-star"></i> {ser.rating}</span>
                                    </div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
            <div className="Detail-location">
                <div className="Detail-location-Title">
                    <h3>Location</h3>
                </div>
                <div className="Detail-location-Map">
                    <iframe title="map direction" className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1571247805678!2d106.79659497451841!3d10.875651357356737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a1768e1d03%3A0x38d3ea53e0581ae0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puLCDEkEhRRy1IQ00sIEPGoSBz4bufIExpbmggVHJ1bmcu!5e0!3m2!1svi!2s!4v1732111037142!5m2!1svi!2s" loading='lazy'></iframe>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;