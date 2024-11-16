document.addEventListener('DOMContentLoaded', function() {
    const bookNowButton = document.querySelector('.book-now');
    if (bookNowButton) {
        bookNowButton.addEventListener('click', function() {
            window.location.href = './booking-02.html';
        });
    }

    const payNowButton = document.querySelector('.pay-now');
    if (payNowButton) {
        payNowButton.addEventListener('click', function() {
            window.location.href = './booking-03.html';
        });
    }

    const backDashboardButton = document.querySelector('.back-dashboard');
    if (backDashboardButton) {
        backDashboardButton.addEventListener('click', function() {
            window.location.href = '../../index.html';
        });
    }
});