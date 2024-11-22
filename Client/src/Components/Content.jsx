import '../Styles/Home_Content.css';
// Import các styles của Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import React, { useEffect, useState } from 'react';

const Content = () => {
  const [attractions, setAttractions] = useState([])
  useEffect(()=>{
    fetch('/attraction')
        .then((response) => response.json())
        .then((data) => setAttractions(data))
        .catch((error) => console.error('Error:', error));
  },[]);


  return (
    <main>
        {/* Slider */}
        <div class="slider-bg">
            <h1 class="slider-title">Welcome</h1>
        </div>
       
        {/* List most visited place */}
        <section className="listVistedPlace">
          <div style={{ fontSize: '20px', paddingTop: '50px', textAlign: 'center' }}>
            <h2 data-i18n="list most visited place" style={{ fontSize: '30px', fontWeight: '800', fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif', textAlign: 'left', marginLeft: '20px' }}>
              Best choice for travellers
            </h2>
          </div>
          <div className="scroll-container">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {attractions.map((attr,index)=>{
                return (
                  
                    <div  className="framePlace">
                      <div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                          <img src={attr.img_url} alt="tour_ha_long" width="220" height="200" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="place_content">
                          <h4>{attr.attraction_name}</h4>
                          <p style={{ marginTop: '10px' }}>
                            <span className="tagView text-clamp">{attr.description}</span>
                          </p>
                          <p style={{ marginTop: '5px', color: '#757575' }}>
                            <span style={{ color: '#f09b0a', fontWeight: 'bold', marginRight: '10px' }}>★ {attr.rating}</span>
                            <span>Mở cửa: {attr.opening_hours} </span>
                            {/* <span> • 3M+ booked </span> */}
                          </p>
                          <p style={{ marginTop: '20px' }}>
                            {/* Để dành nếu cần thêm phần tiền */}
                          </p>
                        </div>
                      </div>
                    </div>
                  
                )
              })}
              </div>
          </div>
        </section>


        {/* <!-- Voucher --> */}
        <section id="aboutUs">
          <div class="container">
              <img src="/Images/girl1_aboutUs.jpg" alt="" id="img1"/>
              <img src="/Images/man1_aboutUs.jpg" alt="" id="img2"/>
              <div class="content">
                  <h2 class="main_title">About us</h2>
                  <p class="main_content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum illo
                      necessitatibus rem adipisci iste accusamus, fugit quae sit? Placeat tempora, accusamus ipsam
                      praesentium deserunt quod quis hic inventore tempore sed.</p>
                  <div class="list_benifit">
                      <div>
                          <div>
                              <i class="fa-solid fa-circle-right"></i>
                              <span>Personalized Service</span>
                          </div>
                          <div>
                              <i class="fa-solid fa-circle-right"></i>
                              <span>Best price</span>
                          </div>
                      </div>
                      <div>
                          <div>
                              <i class="fa-solid fa-circle-right"></i>
                              <span>24x7 Support</span>
                          </div>
                          <div>
                              <i class="fa-solid fa-circle-right"></i>
                              <span>Trusted company</span>
                          </div>
                      </div>
                  </div>
                  <a href="#!">Explore now</a>
              </div>
          </div>
        </section>
        
        <section id="featureFacility">
            <h2>Feature Booking Facility</h2>
            <div class="container">
                <a href="#!" class="bookRes ele">
                    <div>
                        <h3>Book Restaurant</h3>
                        <p>123+ Restaurant</p>
                    </div>
                </a>
                <a href="#!" class="bookHol ele">
                    <div>
                        <h3>Book Hotel</h3>
                        <p>123+ Hotel</p>
                    </div>
                </a>
                <a href="#!" class="bookTic ele">
                    <div>
                        <h3>Book ticket</h3>
                        <p>123+ Attraction</p>
                    </div>
                </a>
            </div>
        </section>

        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    </main>
  );
};

export default Content;