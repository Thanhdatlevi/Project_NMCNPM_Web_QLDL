import React, {useEffect,useRef} from 'react';
import '../Styles/ServicePage.css';
import { Link } from 'react-router-dom';
const ServicePage = () => {
  return (
      <div className ="detail-container">
          <section className="OverviewService" >
            <div className="NameModel">
                        <div className = "leftside">
                            <div className = "Title">
                                <h1>Whispering Pines Cottages|Treehouse|Tandi</h1>
                            </div>
                            <div className ="location">
                                <span className="location-icon">
                                    <i className='bx bx-map'></i>
                                    <p>Jibhi, Himachal Pradesh, India</p>
                                </span>
                            </div>
                            <div className = "rating">
                                <p>
                                <span className="rating-point">4.5</span>
                                <strong className ="Status">Very good</strong>
                                <span className="rating-total">8386 reviews</span>
                                </p>
                            </div>
                        </div>
                        <div className = "rightside">
                            <div className = "price">
                                <p><span className ="price-tag">$240
                                </span>/night</p>
                            </div>
                            <div className= "button-function">
                                <span className= "icon">
                                    <i className='bx bx-heart'></i>
                                </span>
                                <span className= "icon">
                                    <i className='bx bx-share-alt'></i>
                                </span>
                                <Link to ="/booking01">
                                <button className="book-now">Book Now</button>
                                </Link>
                            </div>
                        </div>
                    
                    </div>
            <div className = "Gallery">
                <div className = "main-pic">
                    <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                </div>
                <div className = "sub-pic">
                    <img className="pic2" src={'/Images/voucher_tour2.jpg'} alt="pic2" />
                    <img className="pic3" src={'/Images/voucher_tour2.jpg'} alt="pic3" />
                    <img className="pic4" src={'/Images/voucher_tour2.jpg'} alt="pic4" />
                    <img className="pic5" src={'/Images/voucher_tour2.jpg'} alt="pic5" />
                </div>
            </div>
            <section className='short-description'>
                <div className="description-title">
                    <h3>Overview</h3>
                </div>
                <div className= "description-content">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                    Libero aliquet taciti dui habitant faucibus natoque rutrum nostra. Porta aenean commodo potenti blandit pretium sapien dui vehicula. Pretium sit diam efficitur, eleifend mattis netus. Maecenas aenean tempus senectus turpis himenaeos odio porta. Nostra in luctus aliquam auctor, lacinia lectus urna netus. Urna quis iaculis metus; montes elementum feugiat leo. Sem egestas lacinia facilisi taciti aliquam aliquam nullam ridiculus.                    </p>
                </div>
            </section>
            <div className = "amenities">
                <div className="amenities-title">
                    <h3>Amenities</h3>
                </div>
                <div className="amenities-content">
                    <span className="amenities-item">
                        <i className='bx bxs-bed'></i>
                        <p>Bedroom</p>
                    </span>
                    <span className="amenities-item">
                        <i className='bx bxs-bath'></i>
                        <p>Bathroom</p>
                    </span>
                    <span className="amenities-item">
                        <i className='bx bxs-car'></i>
                        <p>Parking</p>
                    </span>
                    <span className="amenities-item">
                        <i className='bx bx-wifi' ></i>
                        <p>Wifi</p>
                    </span>
                    <span className="amenities-item">
                        <i className ='bx bx-restaurant'></i>
                        <p>Restaurant</p>
                    </span>
                    <span className="amenities-item">
                    <i className='bx bxs-coffee' ></i>
                        <p>Coffee</p>
                    </span>
                </div>
            </div>
        </section>

        <div className = "userrating-reviews">
                <div className = "userrating-reviews-Title">
                    <h3>User Ratings & Reviews</h3>
                </div>
                <div className = "userrating-reviews-overviewRate">
                    <div className = "total-rating">
                        <div className ="rating-point">
                            <h2>4.5</h2>
                        </div>
                        <div className = "rating-total">
                            <strong className ="Status">Very good</strong>
                            <span className="rating-view"> 8386 reviews</span>
                        </div>
                    </div>
                    <div className = "feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className = "feature-info">
                            <p>Child Friendliness</p>
                            <p class="score">4.5</p>
                        </div>
                    </div>
                    <div className = "feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className = "feature-info">
                            <span>Location</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className = "feature-rating">
                        <div className="progress-bar">
                            <div className="filled"></div>
                        </div>
                        <div className = "feature-info">
                            <span>Amenities</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className = "feature-rating">
                        <div className="progress-bar">
                                <div className="filled"></div>
                        </div>
                        <div className = "feature-info">
                            <span>Hospitality</span>
                            <span class="score">4.5</span>
                        </div>
                    </div>
                    <div className = "feature-rating">
                        <div className="progress-bar">
                                <div className="filled"></div>
                            </div>
                            <div className = "feature-info">
                                <span>Food</span>
                                <span class="score">4.5</span>
                            </div>
                        </div>
                    
                </div>
                <div className = "userrating-reviews-Feedback">
                    <div className = "Feedback-items">
                        <div className ="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className ="feedback-content">
                            <div className="feedback-title">
                                <div className ="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className ="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className ="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className = "Feedback-items">
                        <div className ="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className ="feedback-content">
                            <div className="feedback-title">
                                <div className ="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className ="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className ="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className = "Feedback-items">
                        <div className ="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className ="feedback-content">
                            <div className="feedback-title">
                                <div className ="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className ="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className ="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className = "Feedback-items">
                        <div className ="feedback-avt">
                            <img src={'/Images/voucher_tour2.jpg'} alt="pic1" />
                        </div>
                        <div className ="feedback-content">
                            <div className="feedback-title">
                                <div className ="feedback-rating">
                                    <span className="rating-point">4.5 Amazing</span>
                                </div>
                                <div className ="feedback-name">
                                    <p>John Doe</p>
                                </div>
                            </div>
                            <div className ="feedback-comment">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className = "Detail-location">
            <div className = "Detail-location-Title">
                <h3>Location</h3>
            </div>
            <div className = "Detail-location-Map">
                <iframe title="map direction" className="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1571247805678!2d106.79659497451841!3d10.875651357356737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a1768e1d03%3A0x38d3ea53e0581ae0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBLaG9hIGjhu41jIFThu7Egbmhpw6puLCDEkEhRRy1IQ00sIEPGoSBz4bufIExpbmggVHJ1bmcu!5e0!3m2!1svi!2s!4v1732111037142!5m2!1svi!2s" loading='lazy'></iframe>
            </div>
        </div>
    </div>
  );
};

export default ServicePage;