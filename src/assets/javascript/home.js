
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([10.7627841, 106.6824625], 20.5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);
    L.marker([10.7627841, 106.6824625]).addTo(map)
        .bindPopup('We here!')
        .openPopup();
});
