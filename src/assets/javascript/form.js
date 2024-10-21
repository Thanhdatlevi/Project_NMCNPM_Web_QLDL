let city = "";
let cur_data;
async function setCity() {
    const places = document.getElementById('display-place');
    const numOfPlace = countChildElement(places);
    if(numOfPlace > 2){
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "You must delete all added places before changing the city.";
        return;
    }
    else{
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "";
    }
    city = document.getElementById('city').value;
    populateSelect(cur_data);
}


// load data from file JSON
async function loadJSON() {
    const response = await fetch('../JSON/data/places.json');
    const data = await response.json();
    return data;
}

// add option into <select>
function populateSelect(data) {
    const select = document.getElementById('place-list');
    clearSelect(select);
    data.forEach(element => {
        if(element.city == city){
            element.place.forEach(item => {
                const option = document.createElement('option');
                //option.value = item.name;
                option.textContent = item.name;
                select.appendChild(option);
            });
        }
    });
    select.selectedIndex = 0;
    const infor = document.getElementById('place-description');
    infor.innerHTML = "Place's description here.";
}

function clearSelect(select){
    while(select.options.length > 1){
        select.remove(1);
    }
}

function show_infor(selectedElement){
    const parent = selectedElement.parentNode;
    const infor = parent.querySelector('#place-description');
    const place = parent.querySelector('#place-list').value;
    cur_data.forEach(element => {
        if(element.city == city){
            element.place.forEach(item => {
                if(item.name == place){
                    infor.innerHTML = item.description;
                    return;
                }
            });
        }
    });
}

function addPlace(){
    const cur_city = document.getElementById('city').value;
    if(cur_city == ""){
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "Please choose the city first.";
        return;
    }
    else{
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "";
    }
    const item = document.getElementById('place-item');
    const object = document.getElementById('display-place');
    const clone = item.cloneNode(true);
    object.appendChild(clone);
    const newsetChild = object.lastElementChild;
    newsetChild.querySelector('#time-place').value = new Date().toISOString().split('T')[0];
    newsetChild.querySelector('#place-description').innerHTML = "Place's description here.";
}

function countChildElement(parent){
    return parent.childElementCount;
}

function deletePlace(selectedElement){
    const parent = selectedElement.parentNode.parentNode;
    if (countChildElement(parent.parentNode) == 2){
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "You can't delete the last place.";
        return;
    }
    else{
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "";
    }
    parent.remove();
}

function set_date(){
    const toDay = new Date().toISOString().split('T')[0];
    const date = document.getElementById('time-place');

    if(date.value < toDay){
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "You can't choose the past date.";
        date.value = toDay;
    }
    else{
        const notice = document.getElementById('notice-place');
        notice.innerHTML = "";
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    cur_data = await loadJSON();
    const date = document.getElementById('time-place');
    date.value = new Date().toISOString().split('T')[0];
});