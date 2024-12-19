import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Styles/Profile.css";
import "../Styles/MyFacility.css";

const MyFacility = () => {
    let provider = 'p002'
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentService, setCurrentService] = useState([]);
    const [activeTab, setActiveTab] = useState('res');

    const handleDelete = async (service, id, facilityID) => {
        if (!window.confirm("Are you sure you want to delete this item?")) {
            return;
        }
        try {
            const response = await fetch(`/${service}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    provider_id: provider,
                    facility_id: facilityID,
                    specificFacility_id: id,
                }),
            });
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(errorMessage.message || "Failed to delete item.");
            }
    
            alert("Item deleted successfully.");

            fetchData(service);
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("An error occurred while deleting the item.");
        }
    };

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return currentService.slice(startIndex, endIndex);
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
        const response = await fetch(`/${service}/get${service}ByProviderid/${provider}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const detailData = await response.json();
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

    const handleEditClick = (id) => {
        localStorage.setItem('selectedServiceId', id);
    };

    return (
        <main id="hisPost">
            <section className="tabs">
                <button id="btn_res" className={activeTab === 'res' ? 'active' : ''} onClick={() => fetchData('res')}>Restaurant Booking</button>
                <button className={activeTab === 'hotel' ? 'active' : ''} id="btn_hotel" onClick={() => fetchData('hotel')}>Hotel Booking</button>
            </section>

            <section className="post-list-history">
                <div className="type-post">
                    <select>
                        <option>Lastest Booking</option>
                    </select>
                </div>

                <div className="post-information-container">
                    {paginateData().map((ser) => {
                        handleEditClick(ser.id);
                        

                        return (
                            <div className="post-card">
                                <img src={ser.images[0]} alt="Service Image"/>
                                <div className="post-info">
                                    <h3>{ser.name}</h3>
                                    <p>
                                        <span role="img" aria-label="location">📍</span>{" "}{ser.location}
                                    </p>
                                    <div className="check-info">
                                        <div>
                                            <p>Rating</p>
                                            <p>
                                                <strong>{ser.rating}</strong>
                                            </p>
                                        </div>
                                        <div>
                                            <p>Deal</p>
                                            <p>
                                                <strong>{ser.deal}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="zone_btn">
                                    <button className="btn_detail">View detail</button>
                                    <div className="btn_main">
                                        <Link to="/facilityForm">
                                            <button className="btn_fix" onClick={() => handleEditClick(ser.id,ser.name,ser.location, ser.des)}>
                                                <i className="fa-solid fa-screwdriver-wrench"></i>
                                            </button>
                                        </Link>
                                        <button className="btn_delete" onClick={() => handleDelete(activeTab, ser.id, ser.facid)}>
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
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
        </main>
    );
};

export default MyFacility;