import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';  
document.addEventListener("DOMContentLoaded", function() {
    const imageGroups = {
        "Thành phố Hồ Chí Minh": [
            "../Images/TP_HCM/image1.jpg",
            "../Images/TP_HCM/image2.jpg",
            "../Images/TP_HCM/image3.jpg",
            "../Images/TP_HCM/image4.jpg",
            "../Images/TP_HCM/image5.jpg",
            "../Images/TP_HCM/image6.jpg",
            "../Images/TP_HCM/image7.jpg",
            "../Images/TP_HCM/image8.jpg"
        ],
        "Hà Nội": [
            "../image/Hà Nội/image1.jpg",
            "../image/Hà Nội/image2.jpg",
            "../image/Hà Nội/image3.jpg",
            "../image/Hà Nội/image4.jpg",
            "../image/Hà Nội/image5.jpg",
            "../image/Hà Nội/image6.jpg",
            "../image/Hà Nội/image7.jpg",
            "../image/Hà Nội/image8.jpg"
        ],
        "Da_Nang_Hue_Hoi_An": [
            "../image/Da_Nang_Hue_Hoi_An/image1.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image2.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image3.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image4.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image5.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image6.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image7.jpg",
            "../image/Da_Nang_Hue_Hoi_An/image8.jpg"
        ]
    };
    
    const slidesContainer = document.getElementById('slides');

    function createSlides() {
        Object.keys(imageGroups).forEach((groupName) => {
            const group = imageGroups[groupName];
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            const title = document.createElement('h3');
            title.textContent = groupName; // Đặt tên nhóm làm tiêu đề
            slide.appendChild(title);

            const gridContainer = document.createElement('div');
            gridContainer.classList.add('grid-container');

            group.forEach((path, imgIndex) => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item');
                const img = document.createElement('img');
                img.src = path;
                img.alt = `Picture ${imgIndex + 1}`;
                gridItem.appendChild(img);
                gridContainer.appendChild(gridItem);
            });

            slide.appendChild(gridContainer);
            slidesContainer.appendChild(slide);
        });
    }

    createSlides();

    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        effect: 'coverflow', // Có thể thay bằng 'slide', 'cube', 'coverflow', hoặc 'flip'
        fadeEffect: {
            crossFade: true // Chuyển đổi mượt mà giữa các slide
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: function () {
                // Nếu cần cập nhật nội dung, có thể thêm logic tại đây
            }
        }
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Lắng nghe sự kiện nhấn phím
    document.addEventListener('keydown', function(event) {
        const swiperContainer = document.querySelector('.swiper-container');
        
        // Kiểm tra nếu phần tử swiper đang hiển thị trên màn hình
        if (isElementInViewport(swiperContainer)) {
            // Kiểm tra nếu phím nhấn là mũi tên trái hoặc phải
            if (event.key === 'ArrowLeft') {
                swiper.slidePrev(); // Trượt về phía trước
            } else if (event.key === 'ArrowRight') {
                swiper.slideNext(); // Trượt về phía sau
            }
        }
    });
});