import React from "react";
import '../Styles/Form.css';
import { Link } from "react-router-dom";

const Form = () => {
    let city = "";
    let data = [];
    const originalPlace = document.getElementById('display-place').innerHTML;
    const originalRes = document.getElementById('display-res').innerHTML;
    const originalHol = document.getElementById('display-hol').innerHTML;

    async function setCity() {
        document.getElementById('display-place').innerHTML = originalPlace;
        document.getElementById('display-res').innerHTML = originalRes;
        document.getElementById('display-hol').innerHTML = originalHol;
        city = document.getElementById('city').value;
        populateSelect(data);
    }

    // load data from file JSON
    async function loadJSON1() {
        const response = await fetch('');
        const data1 = await response.json();
        return data1;
    }

    async function loadJSON2() {
        const response = await fetch('../JSON/data/hotel.json');
        const data2 = await response.json();
        return data2;
    }

    async function loadJSON3() {
        const response = await fetch('../JSON/data/hotel.json');
        const data3 = await response.json();
        return data3;
    }

    function show_img(selectedElement, type) { return; }
    function show_infor(selectedElement, type) { return; }
    // add option into <select>
    function populateSelect(data) {
        const selects = Array.from(document.getElementsByClassName('list'));
        selects.forEach((select, index) => {
            clearSelect(select);
            data[index].forEach(element => {
                if (element.city == city) {
                    element.place.forEach(item => {
                        const option = document.createElement('option');
                        option.textContent = item.name;
                        select.appendChild(option);
                    });
                }
            });
            select.selectedIndex = 0;
        })
    }

    function clearSelect(select) {
        while (select.options.length > 1) {
            select.remove(1);
        }
    }

    function addElement(e) {
        const cur_city = document.getElementById('city').value;
        if (cur_city == "") {
            const notice = document.getElementById(`notice-${e.target.value}`);
            notice.innerHTML = "Please choose the city first.";
            return;
        }
        else {
            const notice = document.getElementById(`notice-${e.target.value}`);
            notice.innerHTML = "";
        }
        const item = document.getElementById(`${e.target.value}-item`);
        const object = document.getElementById(`display-${e.target.value}`);
        const clone = item.cloneNode(true);

        const hrElement = document.createElement('hr');
        object.appendChild(hrElement);

        object.appendChild(clone);
        const newsetChild = object.lastElementChild;
        if (e.target.value != 'place') return;
        newsetChild.querySelector('#time-place').value = new Date().toISOString().split('T')[0];
    }

    function countChildElement(parent) {
        return parent.childElementCount;
    }

    function deleteElement(selectedElement, type) {
        const parent = selectedElement.parentNode.parentNode;
        if (countChildElement(parent.parentNode) == 2) {
            const notice = document.getElementById(`notice-${type}`);
            notice.innerHTML = "You can't delete the last place.";
            return;
        }
        else {
            const notice = document.getElementById(`notice-${type}`);
            notice.innerHTML = "";
        }
        parent.remove();
    }

    function set_date() {
        const toDay = new Date().toISOString().split('T')[0];
        const date = document.getElementById('time-place');

        if (date.value < toDay) {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "You can't choose the past date.";
            date.value = toDay;
        }
        else {
            const notice = document.getElementById('notice-place');
            notice.innerHTML = "";
        }
    }

    document.addEventListener('DOMContentLoaded', async function () {
        data = await Promise.all([loadJSON1(), loadJSON2(), loadJSON3()]);
        const date = document.getElementById('time-place');
        date.value = new Date().toISOString().split('T')[0];
    });

    return (
        <main id="main_content">
            <div id="itinar">
                <section className="header-container_form">
                    <input id="tour_name" placeholder="Enter your tour's name"></input>
                    <div id="tour-name-container">
                        <select id="city" onchange={() => setCity()}>
                            <option value="" disabled selected>City</option>
                            <option value="Hanoi">Ha Noi</option>
                            <option value="HCM">Ho Chi Minh</option>
                            <option value="DaNang">Da Nang</option>
                            <option value="Hue">Hue</option>
                        </select>
                    </div>
                </section>

                <section id="form_place">

                    <div className="add">
                        <p id="title-text" data-i18n="travel-place">
                            Travel place
                        </p>
                        <button id="add-place-button" value="place" onclick={(event) => addElement(event)}>Add</button>
                    </div>

                    <div id="display-place">
                        <p id="notice-place" >

                        </p>
                        <div id="place-item">
                            <div id="settime">
                                <input type="time" />
                                <input id="time-place" type="datetime" onchange={() => set_date()} />
                            </div>

                            <div id="place-information">
                                <select className="list" onchange={() => show_img(this, 'place')} value="place">
                                    <option value="" disabled selected>Select a place</option>
                                </select>
                                <button className="detail-button">Detail</button>
                                <button id="delete-place-button" onclick={() => deleteElement(this, 'place')}>Delete</button>
                            </div>
                        </div>
                    </div>
                </section>
                <div id="service">
                    <section id="form_res">

                        <div className="add">
                            <p className="service-text" data-i18n="travel-place">
                                Restaurant
                            </p>
                            <button className="add-res-hol" value="res" onclick={(event) => addElement(event)}>Add</button>
                        </div>


                        <div id="display-res">
                            <p id="notice-res">

                            </p>
                            <div id="res-item">
                                <div id="res-information">
                                    <select className="list" onchange={() => show_infor(this, 'res')} value="res">
                                        <option value="" disabled selected>Select a restaurant</option>
                                    </select>
                                    <button className="detail-button">Detail</button>
                                </div>

                                <div id="res-feature">
                                    <button id="book-res-button">Book</button>
                                    <button id="delete-res-button" onclick={() => deleteElement(this, 'res')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section id="form_hol">

                        <div className="add">
                            <p className="service-text" data-i18n="travel-place">
                                Hotel
                            </p>
                            <button className="add-res-hol" value="hol" onclick={(event) => addElement(event)}>Add</button>
                        </div>


                        <div id="display-hol">
                            <p id="notice-hol">
                            </p>
                            <div id="hol-item">
                                <div id="hol-information">
                                    <select className="list" onchange={() => show_infor(this, 'hol')} value="hol">
                                        <option value="" disabled selected>Select a Hotel</option>
                                    </select>
                                    <button className="detail-button">Detail</button>
                                </div>

                                <div id="hol-feature">
                                    <button id="book-hol-button">Book</button>
                                    <button id="delete-hol-button" onclick={() => deleteElement(this, 'hol')}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div id="submit">
                    <Link to="/tourReservationResult"> Submit </Link>
                </div>
            </div>
        </main>
    );
}

export default Form;
