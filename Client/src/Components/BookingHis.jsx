import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import "../Styles/Profile.css";
import "../Styles/BookingHis.css";

const BookingHis = () => {

    return (
        <main id="history">
          <section className="tabs">
            <button>Restaurant Booking</button>
            <button className="active">Hotel Booking</button>
            <button>Tour Booking</button>
          </section>
    
          <section className="booking-list-history">
            <div className="type-booking">
              <h2>Hotel</h2>
              <select>
                <option>Lastest Booking</option>
              </select>
            </div>
    
            <div className="booking-information-container">
              <div className="booking-card">
                <img
                  src="/Images/img_profile/hotel_history/muongthanh.jpg"
                  alt="Hotel Image"
                />
                <div className="booking-info">
                  <h3>Mường Thanh</h3>
                  <p>
                    <span role="img" aria-label="location">
                      📍
                    </span>{" "}
                    Hồ Chí Minh, Việt Nam
                  </p>
                  <div className="check-info">
                    <div>
                      <p>CHECK IN</p>
                      <p>
                        <strong>Fri 18 Aug 2024</strong>
                      </p>
                    </div>
                    <div>
                      <p>CHECK OUT</p>
                      <p>
                        <strong>Sun 20 Aug 2024</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="booking-card">
                <img
                  src="/Images/img_profile/hotel_history/tinhyeu.jpg"
                  alt="Hotel Image"
                />
                <div className="booking-info">
                  <h3>Khách sạn tình yêu</h3>
                  <p>
                    <span role="img" aria-label="location">
                      📍
                    </span>{" "}
                    KonTum, Việt Nam
                  </p>
                  <div className="check-info">
                    <div>
                      <p>CHECK IN</p>
                      <p>
                        <strong>Wed 16 Aug 2024</strong>
                      </p>
                    </div>
                    <div>
                      <p>CHECK OUT</p>
                      <p>
                        <strong>Thu 17 Aug 2024</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="booking-card">
                <img
                  src="/Images/img_profile/hotel_history/tinh1dem.jpg"
                  alt="Hotel Image"
                />
                <div className="booking-info">
                  <h3>Tình 1 đêm</h3>
                  <p>
                    <span role="img" aria-label="location">
                      📍
                    </span>{" "}
                    Gia Lai, Việt Nam
                  </p>
                  <div className="check-info">
                    <div>
                      <p>CHECK IN</p>
                      <p>
                        <strong>Tue 15 Aug 2024</strong>
                      </p>
                    </div>
                    <div>
                      <p>CHECK OUT</p>
                      <p>
                        <strong>Tue 15 Aug 2024</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      );
};

export default BookingHis;