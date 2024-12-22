import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../Styles/HomePlace.css';
import { Link, useNavigate } from "react-router-dom";
import BookingDialog from './BookingDialog';

function HomePlace() {
    const [isBookingVisible, setIsBookingVisible] = useState(false);
    const [city, setCity] = useState("");
    const [data, setData] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [originalContent, setOriginalContent] = useState({
        place: '', res: "", hol: "",
        city: "<option value=\"\" disabled selected>City</option>"
    });

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
            console.log(data);
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
            const [places, hotels, res] = await Promise.all([loadJSON1(), loadJSON3(), loadJSON2()]);
            setData([places, hotels, res]);
        };

        fetchData();
        fetchCity();
    }, [fetchCity, setOriginalContent]);

    useEffect(() => {
        if (displayCity.current) {
            displayCity.current.innerHTML = originalContent.city;
            cityList.forEach((element) => {
                const option = document.createElement('option');
                option.textContent = element.locationName;
                option.value = element.locationId;
                displayCity.current.appendChild(option);
            });
        }
    }, [cityList, originalContent]);

    function setDelete() {
        const deleteButton = document.querySelectorAll(`.deletebtn`);
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].onclick = (event) => deleteElement(event, `${deleteButton[i].value}`);
        }
    }

    function setBook() {
        const deleteButton = document.querySelectorAll(`.bookbtn`);
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton[i].onclick = (event) => bookBtn(event, `${deleteButton[i].value}`);
        }
    }

    const [handleBookingFinished, setHandleBookingFinished] = useState(null);

    let navigate = useNavigate();
    function bookBtn(event, type) {
        const parent = event.target.parentNode.parentNode.parentNode.parentNode;
        if (type === 'res' || type === 'hol') {
            const selected = parent.querySelector('.list').value;
            localStorage.setItem('selected', selected);
            localStorage.setItem('type', type);
        }

        const quantity = parent.querySelector('p').innerHTML.toString().split(' ')[0];
        localStorage.setItem('quantity', quantity);

        const p = parent.querySelector('p');

        const booking = document.getElementById('dialog');
        booking.classList.toggle('hidden');
        setIsBookingVisible(prevState => !prevState);

        const handleBookingFinished_func = (new_quantity) => {
            setQuantity(p, type, new_quantity);
        };

        // Pass the callback to BookingDialog
        setHandleBookingFinished(() => handleBookingFinished_func);
    }

    function setQuantity(p, _type, _value) {
        if (_value) {
            console.log(_value);
            const p_string = _value.toString() + (_type === 'res' ? " tables" : " days");
            p.innerHTML = p_string;
        }
    }

    async function loadJSON1() {
        const response = await fetch('http://localhost:3000/attraction/getFilterattraction');
        const data1 = await response.json();
        return data1;
    }
    async function loadJSON2() {
        const response = await fetch('http://localhost:3000/hotel/getFilterhotel');
        const data2 = await response.json();
        return data2;
    }

    async function loadJSON3() {
        const response = await fetch('http://localhost:3000/restaurant/getFilterrestaurant');
        const data2 = await response.json();
        return data2;
    }

    function handleCityChange(event) {
        displayPlaceRef.current.innerHTML = originalContent.place;
        displayResRef.current.innerHTML = originalContent.res;
        displayHolRef.current.innerHTML = originalContent.hol;

        let selectedCity = event.target.value;
        setCity(event.target.value);
        setDelete();
        setBook();
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
                    option.value = element.attraction_id ? element.attraction_id : element.facility_id;
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
            const notice = document.getElementById(`notice-${e}`);
            notice.innerHTML = "Please choose the city first.";
            return;
        }
        const item = document.getElementById(`${e}-item`);
        const object = document.getElementById(`display-${e}`);
        const clone = item.cloneNode(true);
        object.appendChild(clone);
        setDelete();
        setBook();
        const newChild = object.lastElementChild;
        if (e === 'place') {
            newChild.querySelector('#time-place').value = new Date().toISOString().split('T')[0];
        }
    }

    const deleteElement = (event, type) => {
        const parent = event.target.parentNode.parentNode.parentNode.parentNode;
        const container = document.getElementById(`display-${type}`);
        const notice = document.getElementById(`notice-${type}`);

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
        if (!canNavigate) {
            const selected = document.querySelectorAll('.list');
            const selections = {};
            let count_selected = 0;
            Array.from(selected).some(element => {
                if (element.selectedIndex !== 0) {
                    let quantity = "";
                    if (element.parentNode.querySelector('p')) {
                        quantity = element.parentNode.querySelector('p').innerHTML.split(' ')[0];
                        if (quantity === "0") {
                            quantity = "1";
                        }
                    }
                    else {
                        quantity = "1";
                    }

                    selections[element.value] = {
                        ID: element.value,
                        quantity: quantity,
                    };
                    count_selected++;
                }
            });

            if (count_selected === 0) {
                alert("At least one field must be selected.");
                return;
            } else {
                // Handle the case where at least one field is selected
                var jsonSelections = JSON.stringify(selections);
                localStorage.setItem('selections', jsonSelections);
                localStorage.setItem('city', city);
                setCanNavigate(true);
                submitBtnHandle();
            }
        }
    }

    const [visibleSection, setVisibleSection] = useState('place');

    function View_change(event) {
        setVisibleSection(event);
    }

    return (
        <main id="main_content_homePlaces">
            <BookingDialog id="dialog"
                isBookingVisible={isBookingVisible}
                handleBookingFinished={handleBookingFinished}
            />
            <div id="itinar">
                <section className="header-container-form">
                    <div id="tour-name-container">
                        <select id="city" onChange={handleCityChange} ref={displayCity}>
                            <option value="" disabled selected>City</option>
                        </select>
                    </div>
                    <button id="placeToggle" onClick={() => View_change('place')}>Place</button>
                    <button id="holToggle" onClick={() => View_change('hol')}>Hotel</button>
                    <button id="resToggle" onClick={() => View_change('res')}>Restaurant</button>
                </section>

                <div style={{ display: "flex", flexDirection: "row" }}>
                    <div id="view-container">
                        {/* <!-- Place --> */}
                        <section id="form_place" style={{ display: visibleSection === 'place' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div className="add">
                                <p id="title-text" data-i18n="travel-place">
                                    Travel place
                                </p>
                                <button id="add-place-button" value="place" onClick={() => addElement('place')}><img src='/Images/add.png' /></button>
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
                                        <select className="list" value="place">
                                            <option value="" disabled selected>Select a place</option>
                                        </select>
                                        <div>
                                            <button className="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="delete-place-button" className="deletebtn" value="place" onClick={(event) => deleteElement(event, 'place')}><img src='/Images/delete.png' /></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>
                        <section id="form_res" style={{ display: visibleSection === 'res' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div className="add">
                                <p className="service-text" data-i18n="travel-place">
                                    Restaurant
                                </p>
                                <button className="add-res-hol" value="res" onClick={() => addElement('res')}><img src="/Images/add.png" /></button>
                            </div>

                            {/* <!-- display place --> */}
                            <div id="display-res" ref={displayResRef}>
                                <p id="notice-res">

                                </p>
                                <div id="res-item">
                                    <div id="res-information">
                                        <select className="list" value="res">
                                            <option value="" disabled selected>Select a restaurant</option>
                                        </select>
                                        <p value="0" >0 tables</p>

                                        <div>
                                            <button className="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="book-res-button" value='res' className='bookbtn' onClick={(event) => bookBtn(event, 'res')}><img src="/Images/book.png" /></button>
                                            <button id="delete-res-button" className="deletebtn" value="res" onClick={(event) => deleteElement(event, 'res')}><img src='/Images/delete.png' /></button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </section>
                        {/* <!-- Hotel --> */}
                        <section id="form_hol" style={{ display: visibleSection === 'hol' ? 'block' : 'none' }}>
                            {/* <!-- add place --> */}
                            <div className="add">
                                <p className="service-text" data-i18n="travel-place">
                                    Hotel
                                </p>
                                <button className="add-res-hol" value="hol" onClick={() => addElement('hol')}><img src="/Images/add.png" /></button>
                            </div>

                            {/* <!-- display place --> */}
                            <div id="display-hol" ref={displayHolRef}>
                                <p id="notice-hol">

                                </p>
                                <div id="hol-item">
                                    <div id="hol-information">
                                        <select className="list" onChange="show_infor(this,'hol')" value="hol">
                                            <option value="" disabled selected>Select a Hotel</option>
                                        </select>
                                        <p value="0" >0 days</p>
                                        <div>
                                            <button className="detail-button"><img src="/Images/detail.png" /></button>
                                            <button id="book-hol-button" value='hol' className='bookbtn' onClick={(event) => bookBtn(event, 'hol')}><img src="/Images/book.png" /></button>
                                            <button id="delete-hol-button" className="deletebtn" value="hol" onClick={(event) => deleteElement(event, 'hol')}><img src='/Images/delete.png' /></button>
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