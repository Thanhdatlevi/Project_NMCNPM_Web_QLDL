let city = "";
let data = [];
const originalPlace = document.getElementById('display-place').innerHTML;
const originalRes = document.getElementById('display-res').innerHTML;
const originalHol = document.getElementById('display-hol').innerHTML;

async function setCity() {
    document.getElementById('display-place').innerHTML=originalPlace;
    document.getElementById('display-res').innerHTML=originalRes;
    document.getElementById('display-hol').innerHTML=originalHol;
    city = document.getElementById('city').value;
    populateSelect(data);
}


// load data from file JSON
async function loadJSON1() {
    const response = await fetch('../JSON/data/places.json');
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
// add option into <select>
function populateSelect(data) {
    const selects = Array.from(document.getElementsByClassName('list'));
    selects.forEach((select,index)=>{
        clearSelect(select);
        data[index].forEach(element => {
            if(element.city == city){
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

function clearSelect(select){
    while(select.options.length > 1){
        select.remove(1);
    }
}

// function show_img(selectedElement,type){
//     const parent = selectedElement.parentNode;
//     const infors = parent.querySelector(`#${type}_img`);
//     // const place = parent.querySelector('#place-list').value;
//     const place = selectedElement.value;
//     let index = type=='place' ? 0 : type == 'res' ? 1 : 2;
//     data[index].forEach(element => {
//         if(element.city == city){
//             element.place.forEach(item => {
//                 if(item.name == place){
//                     console.log(item.image)
//                     infors.setAttribute("src", `${item.image}`);
//                     return;
//                 }
//             });
//         }
//     });
// }

function addElement(e){
    const cur_city = document.getElementById('city').value;
    if(cur_city == ""){
        const notice = document.getElementById(`notice-${e}`);
        notice.innerHTML = "Please choose the city first.";
        return;
    }
    else{
        const notice = document.getElementById(`notice-${e}`);
        notice.innerHTML = "";
    }
    const item = document.getElementById(`${e}-item`);
    const object = document.getElementById(`display-${e}`);
    const clone = item.cloneNode(true);

    // const hrElement = document.createElement('hr');
    // object.appendChild(hrElement);
    
    object.appendChild(clone);
    const newsetChild = object.lastElementChild;
    if(e!='place') return;
    newsetChild.querySelector('#time-place').value = new Date().toISOString().split('T')[0];
}

function countChildElement(parent){
    return parent.childElementCount;
}

function deleteElement(selectedElement,type){
    const parent = selectedElement.parentNode.parentNode.parentNode;
    if (countChildElement(parent.parentNode) == 2){
        const notice = document.getElementById(`notice-${type}`);
        notice.innerHTML = "You can't delete the last place.";
        return;
    }
    else{
        const notice = document.getElementById(`notice-${type}`);
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

function View_change(event){
    const place = document.getElementById('form_place');
    const res = document.getElementById('form_res');
    const hol = document.getElementById('form_hol');

    place.style.display = "none";
    res.style.display = "none";
    hol.style.display = "none";

    if(event == 'place') place.style.display = "block";
    else if(event == 'res') res.style.display = "block";
    else hol.style.display = "block";
}

document.addEventListener('DOMContentLoaded', async function() {
    data = await Promise.all([loadJSON1(), loadJSON2(), loadJSON3()]);
    const date = document.getElementById('time-place');
    date.value = new Date().toISOString().split('T')[0];
    const res = document.getElementById('form_res');
    const hol = document.getElementById('form_hol');

    res.style.display = "none";
    hol.style.display = "none";
});