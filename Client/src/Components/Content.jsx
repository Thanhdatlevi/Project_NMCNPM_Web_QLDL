import '../Styles/Home_Content.css';
// import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Keyboard } from 'swiper/modules';
// Import các styles của Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import React, { useEffect, useState, useRef } from 'react';

const Content = () => {
  const imageGroups = {
    "Thành phố Hồ Chí Minh": [
      '/Images/TP_HCM/image1.jpg',
      '/Images/TP_HCM/image2.jpg',
      '/Images/TP_HCM/image3.jpg',
      '/Images/TP_HCM/image4.jpg',
      '/Images/TP_HCM/image5.jpg',
      '/Images/TP_HCM/image6.jpg',
      '/Images/TP_HCM/image7.jpg',
      '/Images/TP_HCM/image8.jpg',
    ],
    "Hà Nội": [
      '/Images/HaNoi/image1.jpg',
      '/Images/HaNoi/image2.jpg',
      '/Images/HaNoi/image3.jpg',
      '/Images/HaNoi/image4.jpg',
      '/Images/HaNoi/image5.jpg',
      '/Images/HaNoi/image6.jpg',
      '/Images/HaNoi/image7.jpg',
      '/Images/HaNoi/image8.jpg',
    ],
    "Đà Nẵng Huế Hội An": [
      '/Images/DN_H_HA/image1.jpg',
      '/Images/DN_H_HA/image2.jpg',
      '/Images/DN_H_HA/image3.jpg',
      '/Images/DN_H_HA/image4.jpg',
      '/Images/DN_H_HA/image5.jpg',
      '/Images/DN_H_HA/image6.jpg',
      '/Images/DN_H_HA/image7.jpg',
      '/Images/DN_H_HA/image8.jpg',
    ]
  };
  fetch('/res')
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error('Error:', error));

    return (
        <main>
        {/* Slider */}
        <section>
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow, Keyboard]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          effect={'coverflow'}
          pagination={{ clickable: true }}
          navigation={true}
          keyboard={{ enabled: true }}
          className="mySwiper"
        >
          {Object.keys(imageGroups).map((groupName, index) => (
            <SwiperSlide key={index}>
              <h3>{groupName}</h3>
              <div className="grid-container">
                {imageGroups[groupName].map((path, imgIndex) => (
                  <div className="grid-item" key={imgIndex}>
                    <img src={path} alt={`Picture ${imgIndex + 1}`} />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
       
        {/* List most visited place */}
        <section className="listVistedPlace">
          <div style={{ fontSize: '20px', paddingTop: '50px', textAlign: 'center' }}>
            <h2 data-i18n="list most visited place" style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', fontFamily: 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif', textAlign: 'left', marginLeft: '20px' }}>
              Best choice for travellers
            </h2>
          </div>
          <div className="scroll-container">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              {/* Hạ Long */}
              <div className="framePlace">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                    <img src={'/Images/duc/task1_tour_img/task4.img1_halong.jpg'} alt="tour_ha_long" width="220" height="200" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="place_content">
                    <h4>Ha Long</h4>
                    <p style={{ marginTop: '10px' }}>
                      <span className="tagView">Best-seller</span>,
                      <span className="tagView">Most beautiful</span>
                    </p>
                    <p style={{ marginTop: '5px', color: '#757575' }}>
                      <span style={{ color: '#f09b0a', fontWeight: 'bold' }}>★ 4.8</span>
                      <span> (65,546) </span>
                      <span> • 3M+ booked </span>
                    </p>
                    <p style={{ marginTop: '20px' }}>
                      {/* Để dành nếu cần thêm phần tiền */}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Cao Bằng */}
              <div className="framePlace">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                    <img src={'/Images/duc/task1_tour_img/task4.img2_caobang.jpg'} alt="tour_cao_bang" width="220" height="200" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="place_content">
                    <h4>Cao Bang</h4>
                    <p style={{ marginTop: '10px' }}>
                      <span className="tagView">Sale-off</span>,
                      <span className="tagView">Best-seller</span>
                    </p>
                    <p style={{ marginTop: '5px', color: '#757575' }}>
                      <span style={{ color: '#f09b0a', fontWeight: 'bold' }}>★ 4.7</span>
                      <span> (17,899) </span>
                      <span> • 500K+ booked </span>
                    </p>
                    <p style={{ marginTop: '20px' }}>
                      {/* Để dành nếu cần thêm phần tiền */}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Phú Quốc */}
              <div className="framePlace">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                    <img src={'/Images/duc/task1_tour_img/task4.img3_phuquoc.jpg'} alt="tour_phu_quoc" width="220" height="200" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="place_content">
                    <h4>Phu Quoc</h4>
                    <p style={{ marginTop: '10px' }}>
                      <span className="tagView">Best-seller</span>,
                      <span className="tagView">All in one</span>
                    </p>
                    <p style={{ marginTop: '5px', color: '#757575' }}>
                      <span style={{ color: '#f09b0a', fontWeight: 'bold' }}>★ 4.8</span>
                      <span> (169,892) </span>
                      <span> • 5M+ booked </span>
                    </p>
                    <p style={{ marginTop: '20px' }}>
                      {/* Để dành nếu cần thêm phần tiền */}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Hội An */}
              <div className="framePlace">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                    <img src={'/Images/duc/task1_tour_img/task4.img4_hoian.jpg'} alt="tour_hoi_an" width="220" height="200" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="place_content">
                    <h4>Hoi An</h4>
                    <p style={{ marginTop: '10px' }}>
                      <span className="tagView">Best-seller</span>,
                      <span className="tagView">Old culture</span>
                    </p>
                    <p style={{ marginTop: '5px', color: '#757575' }}>
                      <span style={{ color: '#f09b0a', fontWeight: 'bold' }}>★ 4.3</span>
                      <span> (3,047) </span>
                      <span> • 60K+ booked </span>
                    </p>
                    <p style={{ marginTop: '20px' }}>
                      {/* Để dành nếu cần thêm phần tiền */}
                    </p>
                  </div>
                </div>
              </div>
  
              {/* Đà Lạt */}
              <div className="framePlace">
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px' }}>
                    <img src={'/Images/duc/task1_tour_img/task4.img5_dalat.jpg'} alt="tour_da_lat" width="220" height="200" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="place_content">
                    <h4>Da Lat</h4>
                    <p style={{ marginTop: '10px' }}>
                      <span className="tagView">Best-seller</span>,
                      <span className="tagView">Chill night vibes</span>
                    </p>
                    <p style={{ marginTop: '5px', color: '#757575' }}>
                      <span style={{ color: '#f09b0a', fontWeight: 'bold' }}>★ 4.8</span>
                      <span> (169,892) </span>
                      <span> • 5M+ booked </span>
                    </p>
                                <p style={{marginTop: '20px'}}>
                                    {/* <!-- Để dành nếu cần thêm phần tiền --> */}
                                </p>
                            </div>
                        </div>
                    </div>
                
                    {/* <!--Hà Giang--> */}
                    <div className="framePlace">
                        <div>
                            <div style={{display: 'flex', flexDirection: 'column', alignContent: 'center', padding: '10px'}}>
                                <img src={'/Images/duc/task1_tour_img/task4.img6_hagiang.jpg'} alt="tour_ha_giang" width="220"  height="200" style={{ objectFit: 'cover' }}/>
                            </div>
                            <div className="place_content">
                                <h4>
                                    Ha Giang
                                </h4>
                                <p style={{marginTop: '10px'}}>
                                    <span className="tagView"> Sale-off </span> ,     
                                    <span className="tagView"> Keep it real </span>
                                </p>
                                <p style={{marginTop: '5px', color: '#757575'}}>
                                    <span style={{color: '#f09b0a', fontWeight: 'bold'}}> ★ 4.8 </span> 
                                    <span> (1.557) </span>
                                    <span> • 20K+ booked </span>
                                </p>
                                <p style={{marginTop: '20px'}}>
                                    {/* <!-- Để dành nếu cần thêm phần tiền --> */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* <!-- Voucher --> */}
    
        <section id="voucher">
            <h2 data-i18n="voucher">
                Voucher
            </h2>
            <div id="vou">
                <div className="vou_detail">
                    <h3 data-i18n="vou_res">
                        Voucher nhà hàng
                    </h3>
                    <div className="list_vou">
                            <div className="vou_entity">
                                <img src={'/Images/voucher_res1.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>Đà Lạt-Sài Gòn hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                            <div className="vou_entity">
                                <img src={'/Images/voucher_res2.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>Sam hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                            <div className="vou_entity">
                                <img src={'/Images/voucher_res3.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>TTC hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                    </div>
                </div>

                <div className="vou_detail">
                    <h3 data-i18n="vou_tour">
                        Voucher tour
                    </h3>
                    <div className="list_vou">
                            <div className="vou_entity">
                                <img src={'/Images/voucher_tour1.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>Đà Lạt-Sài Gòn hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                            <div className="vou_entity">
                                <img src={'/Images/voucher_tour2.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>Sam hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                            <div className="vou_entity">
                                <img src={'/Images/voucher_tour3.jpg'} alt=""/>
                                <p className="expire_vou">Deal tháng 10</p>
                                <div className="inf">
                                    <p><b>TTC hotel</b></p>
                                    <p>Giảm: 5%</p>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </section>
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
    </main>
    );
};

export default Content;