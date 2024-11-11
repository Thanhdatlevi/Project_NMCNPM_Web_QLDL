import React from 'react';
import '../Styles/ServicePage.css';
const ServicePage = () => {
  return (
      <div>
          <section className="OverviewService" style={{ marginLeft: "0px", padding: "0px", fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif", marginBottom: "50px" }}>
              <section className="nameModel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 0.25fr 0.25fr" }}>
                  <div style={{ gridColumn: "1", gridRow: "1", fontSize: "x-large", fontWeight: "lighter" }}>
                      Tên nhà hàng ngu/ khách sạn rác
                  </div>
                  <div style={{ gridColumn: "4", gridRow: "1" }}>🔗 Share</div>
                  <div style={{ gridColumn: "5", gridRow: "1" }}>💾 Save</div>
              </section>

              <section className="PictureModel" style={{ display: "grid", gridTemplateColumns: "200px 200px 200px 200px", gridTemplateRows: "150px 150px", rowGap: "10px", columnGap: "10px", margin: "50px" }}>
                  <div style={{ gridColumn: "span 2", gridRow: "span 2", margin: "10px" }}>
                      <img src={"Images/duc/task1_tour_img/task4.img1_halong.jpg"} alt="picNgu1" height="310px" width="410px" />
                  </div>
                  <div style={{ gridColumn: "3", gridRow: "1", margin: "10px" }}>
                      <img src={"Images/duc/task1_tour_img/task4.img2_caobang.jpg"} alt="picNgu2" height="150px" width="200px" />
                  </div>
                  <div style={{ gridColumn: "4", gridRow: "1", margin: "10px" }}>
                      <img src={"Images/duc/task1_tour_img/task4.img3_phuquoc.jpg"} alt="picNgu3" height="150px" width="200px" />
                  </div>
                  <div style={{ gridColumn: "3", gridRow: "2", margin: "10px" }}>
                      <img src={"Images/duc/task1_tour_img/task4.img4_hoian.jpg"} alt="picNgu4" height="150px" width="200px" />
                  </div>
                  <div style={{ gridColumn: "4", gridRow: "2", margin: "10px" }}>
                      <img src={"Images/duc/task1_tour_img/task4.img5_dalat.jpg"} alt="picNgu5" height="150px" width="200px" />
                  </div>
              </section>

              <section className='short-description'>
                  <div style={{ fontSize: "x-large", margin: "0px" }}>
                      Room in bãi rác
                  </div>
                  <div style={{ color: "#757575", margin: "0px" }}>
                      1 double rubbish bin, private attach shit
                  </div>
                  <div style={{ margin: "0px" }}>
                      ★ 2.1 .
                      <span style={{ textDecoration: "underline" }}>6996 reviews</span>
                  </div>
              </section>
          </section>

          {/* Nửa dưới */}
          <section className="bookService">
              <button href="#" className="BookButton">
                  Đặt
              </button>
          </section>

          <section className="DescriptionService">
              <h2 className="DescriptionService__Title">Mô tả dịch vụ</h2>
              <p className="DescriptionService__Content">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Sem etiam luctus placerat ut diam egestas odio lobortis. Sodales maecenas finibus facilisis ullamcorper sodales conubia. Varius semper sollicitudin neque rhoncus curabitur class lectus euismod auctor. Cursus urna fusce, ante pretium duis porttitor convallis dignissim. Vivamus et sem tellus leo sed ante vulputate conubia et. Netus urna purus risus mus porttitor fermentum vel taciti?
              </p>
          </section>

          <section className="FeedbackService">
              <h2 className="FeedbackService__Title">Phản hồi</h2>
              <section className="DetailRating">
                  <div className="rating-display">
                      <span className="rating-number">4</span>
                      <span className="rating-total">/5</span>
                  </div>
                  <div className="ratingbar">
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bxs-star'></i>
                      <i className='bx bx-star'></i>
                  </div>
              </section>
              
              <section className="FeedbackService__Content">
                  <div className="FeedbackService__Content__Item">
                      <div className="FeedbackService__Content__Item__Header">
                          <h2>Nguyễn Văn A</h2>
                      </div>
                      <div className="FeedbackService__Content__Item_Rating">
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bx-star'></i>
                      </div>
                      <div className="FeedbackService__Content__Item_Content">
                          <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Lobortis nisl finibus litora mollis porttitor accumsan.</p>
                      </div>
                  </div>

                  <div className="FeedbackService__Content__Item">
                      <div className="FeedbackService__Content__Item__Header">
                          <h2>Nguyễn Văn B</h2>
                      </div>
                      <div className="FeedbackService__Content__Item_Rating">
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bx-star'></i>
                      </div>
                      <div className="FeedbackService__Content__Item_Content">
                          <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Lobortis nisl finibus litora mollis porttitor accumsan.</p>
                      </div>
                  </div>

                  <div className="FeedbackService__Content__Item">
                      <div className="FeedbackService__Content__Item__Header">
                          <h2>Nguyễn Văn C</h2>
                      </div>
                      <div className="FeedbackService__Content__Item_Rating">
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bxs-star'></i>
                          <i className='bx bx-star'></i>
                      </div>
                      <div className="FeedbackService__Content__Item_Content">
                          <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Viverra vulputate per sociosqu a rhoncus.</p>
                      </div>
                  </div>
              </section>
          </section>
      </div>
  );
};

export default ServicePage;