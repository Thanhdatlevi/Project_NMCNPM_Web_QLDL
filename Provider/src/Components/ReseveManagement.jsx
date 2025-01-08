import React from "react";
import { useState, useEffect } from "react";
import "../Styles/ManageBooking.css";

const BookingHistory = () => {
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentService, setCurrentService] = useState([]);
    const [activeTab, setActiveTab] = useState('res');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return currentService.slice(startIndex, endIndex);
    };
    const handleOpenDialog = (reservation) => {
      setSelectedReservation(reservation);
      setIsDialogOpen(true);
    };
    
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedReservation(null);
    };

    function scrollToProductList() {
        const productList = document.getElementById('history');
        if (productList) {
            productList.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const fetchData = async (service) => {
        localStorage.setItem('selectedService', service);
        setActiveTab(service);
        const response = await fetch(`/provider/reserve${service == "res" ? "restaurant" : "hotel"}/by-provider`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const detailData = await response.json();
        console.log(detailData)
        setCurrentPage(1);
        setCurrentService(detailData);
    };

    useEffect(() => {
        fetchData(activeTab);
    }, []);

    const renderPageButtons = () => {
        const totalPages = Math.ceil(currentService.length / itemsPerPage);
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`page-button ${i === currentPage ? 'active' : ''}`}
                    onClick={() => {
                        scrollToProductList();
                        setCurrentPage(i);
                    }}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <main id="history">
            <section className="tabs">
                <button id="btn_res" className={activeTab === 'res' ? 'active' : ''} onClick={() => fetchData('res')}>Restaurant Booking</button>
                <button className={activeTab === 'hotel' ? 'active' : ''} id="btn_hotel" onClick={() => fetchData('hotel')}>Hotel Booking</button>
            </section>
                
              {currentService.length === 0 ? (
              <div>Không có lịch sử đặt</div>
              ) : (
            <section className="post-list-history">
              <div className="post-information-container">
                {paginateData().map((reservation) => (
                  <div className="booking-card" key={reservation.reserveId}>
                    {/* Ảnh đại diện cho đặt chỗ */}
                    <img
                        src={reservation.detailReservations[0].facilityImg || "default_image.jpg"}
                        alt="Service Image"
                    />
                    {/* Thông tin đặt chỗ */}
                    <div className="booking-info">
                        <h3>Reservation ID: {reservation.reserveId}</h3>
                        <p>
                            <span role="img" aria-label="calendar">📅</span>{" "}
                            {new Date(reservation.reservationDate).toLocaleDateString()}
                        </p>
                        <p>Status: <strong>{reservation.status}</strong></p>
                        <p>Total Amount: <strong>${parseFloat(reservation.totalAmount || 0).toFixed(2)}</strong></p>
                    </div>
                    {/* Nút mở dialog */}
                    <button
                        className="detail-button"
                        onClick={() => handleOpenDialog(reservation)}
                    >
                        Details
                    </button>

                    {/* Dialog hiển thị danh sách detailReservations */}
                    {isDialogOpen && selectedReservation?.reserveId === reservation.reserveId && (
                      <div className="detail-dialog">
                        <div className="dialog-content">
                          <h3>Reservation Details</h3>
                          <button className="close-dialog" onClick={handleCloseDialog}>×</button>
                          <div className="dialog-details">
                            {reservation.detailReservations.map((detail, index) => (
                              <div key={index} className="dialog-detail">
                                <p>Facility: <strong>{detail.facilityName}</strong></p>
                                <div className="row">
                                  <p>Quantity: <strong>{detail.quantity}</strong></p>
                                  <p>Price: <strong>${detail.price.toFixed(2)}</strong></p>
                                </div>
                                <div className="row">
                                  <p>Total: <strong>${detail.totalPrice.toFixed(2)}</strong></p>
                                  <p>Check-in: <strong>{detail.checkinTime}</strong></p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(currentService.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(currentService.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
            </section>
              )}
        </main>
    );
};

export default BookingHistory;