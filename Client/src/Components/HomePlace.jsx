import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../Styles/HomePlace.css';
import { Link } from "react-router-dom";

function HomePlace() {
    const [city, setCity] = useState("");
    const [data, setData] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [originalContent, setOriginalContent] = useState({ place: "", res: "", hol: "", city: "<option value=\"\" disabled selected>City</option>" });

    const displayPlaceRef = useRef(null);
    const displayResRef = useRef(null);
    const displayHolRef = useRef(null);
    const displayCity = useRef(null);

    const fetchCity = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:3000/location/allLocation');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCityList(data);
        } catch (error) {
            console.error('Error loading cities:', error);
        }
    }, []);

    useEffect(() => {
        setOriginalContent({
            place: displayPlaceRef.current.innerHTML,
            res: displayResRef.current.innerHTML,
            hol: displayHolRef.current.innerHTML,
            city: displayCity.current.innerHTML
        });

        // Load JSON data on initial render
        const fetchData = async () => {
            const [places, hotels, res] = await Promise.all([loadJSON1(), loadJSON2(), loadJSON3()]);
            setData([places, hotels, res]);
        };

        fetchData();
        fetchCity();
    }, [fetchCity]);

    useEffect(() => {
        if (displayCity.current) {
            displayCity.current.innerHTML = originalContent.city;
            cityList.forEach((element) => {
                const option = document.createElement('option');
                option.textContent = element.location_name;
                option.value = element.location_id;
                displayCity.current.appendChild(option);
            });
        }
    }, [cityList, originalContent]);

    function setDelete() {
        const deleteButton = document.querySelectorAll(`.deletebtn`);
        deleteButton.forEach((element) => {
            console.log(element.value);
            element.onClick = (event) => deleteElement(event, `${element.value}`);
        })
    }

    async function loadJSON1() {
        const response = await fetch('http://localhost:3000/attraction/getfilterattraction');
        const data1 = await response.json();
        return data1;
    }
    async function loadJSON2() {
        const response = await fetch('http://localhost:3000/hotel/getfilterhotel');
        const data2 = await response.json();
        return data2;
    }

    async function loadJSON3() {
        const response = await fetch('http://localhost:3000/res/getFilterres');
        const data2 = await response.json();
        return data2;
    }

    function handleCityChange(event) {
        displayPlaceRef.current.innerHTML = originalContent.place;
        displayResRef.current.innerHTML = originalContent.res;
        displayHolRef.current.innerHTML = originalContent.hol;

        let selectedCity = event.target.value;
        setCity(event.target.value);
        populateSelect(selectedCity);
    }

    function populateSelect(selectedCity) {
        const selects = Array.from(document.getElementsByClassName('list'));
        selects.forEach((select, index) => {
            clearSelect(select);
            data[index].forEach(element => {
                if (element.location_id === selectedCity) {
                    const option = document.createElement('option');
                    option.textContent = element.attraction_name ? element.attraction_name
                        : element.facility_name;
                    option.value = element.attraction_name ? element.attraction_name : element.facility_name;
                    select.appendChild(option);
                }
            });
            select.selectedIndex = 0;
        });
    }

    function clearSelect(select) {
        while (select.options.length > 1) {
            select.remove(1);
        }
    }

    function addElement(e) {
        if (city === "") {
            console.log(e);
            const notice = document.getElementById(`notice-${e}`);
            notice.innerHTML = "Please choose the city first.";
            return;
        }
        const item = document.getElementById(`${e}-item`);
        const object = document.getElementById(`display-${e}`);
        const clone = item.cloneNode(true);
        object.appendChild(clone);
        setDelete()
        const newChild = object.lastElementChild;
        if (e.target.value === 'place') {
            newChild.querySelector('#time-place').value = new Date().toISOString().split('T')[0];
        }
    }

    function deleteElement(event, type) {
        console.log(event.target);
        const parent = event.target.parentNode.parentNode.parentNode;
        const container = document.getElementById(`display-${type}`);
        const notice = document.getElementById(`notice-${type}`);

        console.log(container.childElementCount);
        if (container.childElementCount === 2) {
            notice.innerHTML = "You can't delete the last item.";
            return;
        }
        notice.innerHTML = "";

        parent.remove();
    }

    function handleDateChange(event) {
        const today = new Date().toISOString().split('T')[0];
        if (event.target.value < today) {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "You can't choose the past date.";
            event.target.value = today;
        } else {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "";
        }
    }

    const [canNavigate, setCanNavigate] = useState(false);

    function submitBtnHandle() {
        const selected = document.querySelectorAll('.list');
        const selections = {};
        const hasUnselected = Array.from(selected).some(element => {
            if (element.selectedIndex === 0) {
                alert("Please select all the options");
                return true;
            }
            selections[element.value] = element.value;
            return false;
        });

        if (hasUnselected) {
            return;
        }
        else {
            var jsonSelections = JSON.stringify(selections);
            localStorage.setItem('selections', jsonSelections);
            localStorage.setItem('city', city);
            setCanNavigate(true);
            submitBtnHandle();
        }
    }

    const [visibleSection, setVisibleSection] = useState('place');

    function View_change(event){
        setVisibleSection(event);
    }

    return (
        // <main id="main_content">
        //     <div id="itinar">
        //         <section className="form-header-container">
        //             <input id="tour_name" placeholder="Enter your tour's name" />
        //             <div id="tour-name-container">
        //                 <select id="city" onChange={handleCityChange} ref={displayCity}>
        //                     <option value="" disabled selected>City</option>
        //                 </select>
        //             </div>
        //         </section>

        //         <section id="form_place">
        //             <div className="add">
        //                 <p id="title-text" data-i18n="travel-place">Travel place</p>
        //                 <button id="add-place-button" value="place" onClick={addElement}>Add</button>
        //             </div>

        //             <div id="display-place" ref={displayPlaceRef}>
        //                 <p id="notice-place"></p>
        //                 <div id="place-item" class ="item">
        //                     <div id="settime">
        //                         <input type="time" />
        //                         <input id="time-place" type="date" onChange={handleDateChange} />
        //                     </div>
        //                     <div id="place-information">
        //                         <select className="list" value="place">
        //                             <option value="" disabled selected>Select a place</option>
        //                         </select>
        //                         <Link to = "/servicepage">
        //                         <button className="detail-button">Detail</button>
        //                         </Link>
        //                         <button id="delete-place-button" class="deletebtn" value="place" onClick={(event) => deleteElement(event, 'place')}>Delete</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </section>

        //         <div id="service">
        //             <section id="form_res">
        //                 <div className="add">
        //                     <p className="service-text" data-i18n="travel-place">Restaurant</p>
        //                     <button className="add-res-hol" value="res" onClick={addElement}>Add</button>
        //                 </div>

        //                 <div id="display-res" ref={displayResRef}>
        //                     <p id="notice-res"></p>
        //                     <div id="res-item" class ="item">
        //                         <div id="res-information">
        //                             <select className="list" value="res">
        //                                 <option value="" disabled selected>Select a restaurant</option>
        //                             </select>
        //                             <button className="detail-button">Detail</button>
        //                         </div>

        //                         <div id="res-feature">
        //                             <button id="book-res-button">Book</button>
        //                             <button id="delete-res-button" class="deletebtn" value="res" onClick={() => deleteElement(this, 'res')}>Delete</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>

        //             <section id="form_hol">
        //                 <div className="add">
        //                     <p className="service-text" data-i18n="travel-place">Hotel</p>
        //                     <button className="add-res-hol" value="hol" onClick={addElement}>Add</button>
        //                 </div>

        //                 <div id="display-hol" ref={displayHolRef}>
        //                     <p id="notice-hol"></p>
        //                     <div id="hol-item" class ="item">
        //                         <div id="hol-information">
        //                             <select className="list" value="hol">
        //                                 <option value="" disabled selected>Select a Hotel</option>
        //                             </select>
        //                             <button className="detail-button">Detail</button>
        //                         </div>

        //                         <div id="hol-feature">
        //                             <button id="book-hol-button">Book</button>
        //                             <button id="delete-hol-button" class="deletebtn" value="hol" onClick={() => deleteElement(this, 'hol')}>Delete</button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </section>
        //         </div>
        //         <div id="submit">
        //             <Link to={canNavigate && "/tourReservationResult"} id='submit-btn' onClick={submitBtnHandle}> Submit </Link>
        //         </div>
        //     </div>
        // </main>

        <main id="main_content_homePlaces">
            <div id="itinar">
                <section class="header-container-form">
                    <div id="tour-name-container">
                        <select id="city" onChange={handleCityChange} ref={displayCity}>
                            <option value="" disabled selected>City</option>
                        </select>
                    </div>
                    <button id="placeToggle" onClick={()=>View_change('place')}>Place</button>
                    <button id="holToggle" onClick={()=>View_change('hol')}>Hotel</button>
                    <button id="resToggle" onClick={()=>View_change('res')}>Restaurant</button>
                </section>

                <div style={{display: "flex", flexDirection: "row"}}>
                    <div id="view-container">
                        {/* <!-- Place --> */}
                        <section id="form_place" style={{ display: visibleSection === 'place' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div class="add">
                                <p id="title-text" data-i18n="travel-place">
                                    Travel place
                                </p>
                                <button id="add-place-button" value="place" onClick={()=>addElement('place')}><img src="/Images/add.png" /></button>
                            </div>

                            {/* <!-- display place --> */}
                            <div id="display-place" ref={displayPlaceRef}>
                                <p id="notice-place">

                                </p>
                                <div id="place-item">
                                    <div id="settime">
                                        <input id="time-place" type="date" onChange={handleDateChange} />
                                        <input type="time" />
                                    </div>

                                    <div id="place-information">
                                        <select class="list" onchange="show_img(this,'place')" value="place">
                                            <option value="" disabled selected>Select a place</option>
                                        </select>
                                        <div>
                                            <button class="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="delete-place-button" onClick={() => deleteElement(this, 'hol')}><img src="/Images/delete.png" /></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section id="form_res" style={{ display: visibleSection === 'res' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div class="add">
                                <p class="service-text" data-i18n="travel-place">
                                    Restaurant
                                </p>
                                <button class="add-res-hol" value="res" onClick={()=>addElement('res')}><img src="/Images/add.png" /></button>
                            </div>

                            {/* <!-- display place --> */}
                            <div id="display-res" ref={displayResRef}>
                                <p id="notice-res">

                                </p>
                                <div id="res-item">
                                    <div id="res-information">
                                        <select class="list" onchange="show_infor(this,'res')" value="res">
                                            <option value="" disabled selected>Select a restaurant</option>
                                        </select>
                                        <div>
                                            <button class="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="book-res-button" onClick="window.location.href='service_place.html'"><img src="/Images/book.png" /></button>
                                            <button id="delete-res-button" onClick={() => deleteElement(this, 'hol')}><img src="/Images/delete.png" /></button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
                        {/* <!-- Hotel --> */}
                        <section id="form_hol" style={{ display: visibleSection === 'hol' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div class="add">
                                <p class="service-text" data-i18n="travel-place">
                                    Hotel
                                </p>
                                <button class="add-res-hol" value="hol" onClick={()=>addElement('hol')}><img src="/Images/add.png" /></button>
                            </div>

                            {/* <!-- display place --> */}
                            <div id="display-hol" ref={displayHolRef}>
                                <p id="notice-hol">

                                </p>
                                <div id="hol-item">
                                    <div id="hol-information">
                                        <select class="list" onchange="show_infor(this,'hol')" value="hol">
                                            <option value="" disabled selected>Select a Hotel</option>
                                        </select>
                                        <div>
                                            <button class="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="book-hol-button"><img src="/Images/book.png" /></button>
                                            <button id="delete-hol-button" onClick={() => deleteElement(this, 'hol')}><img src="/Images/delete.png" /></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                    </div>

                    <div id="tour-note">
                        <div id="note-header">
                            Note
                        </div>
                        <textarea id="note" type="text" placeholder="Note"></textarea>
                    </div>
                </div>



                <div id="submit">
                    <Link to={canNavigate && "/tourReservationResult"} id='submit-btn' onClick={submitBtnHandle}> Submit </Link>
                </div>
            </div>
        </main>

    );
}
export default HomePlace;