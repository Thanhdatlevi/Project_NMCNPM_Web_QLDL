window.onload = function() {
    const texts = document.querySelectorAll('.search-label');
    const boxs = document.querySelectorAll('#searchService #search-zone .searchContainer');
    let textWidth;
    texts.forEach((text, index)=>{
        textWidth= text.offsetWidth;
        console.log(textWidth);
        boxs[index].style.setProperty('--before-width', `${textWidth}px`);
    })
  };

const checkboxes = document.querySelectorAll('.single-checkbox');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    checkboxes.forEach(box => {
      if (box !== checkbox) {
        box.checked = false; // Hủy chọn các checkbox khác
      }
    });
  });
});

let currentPage = 1;
const itemsPerPage = 6;

function showPage(page) {
    const services = document.querySelectorAll('.service');
    const totalPages = Math.ceil(services.length / itemsPerPage);

    // Ensure the current page is within valid range
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    // Hide all items
    services.forEach(service => service.style.display = 'none');

    // Calculate the start and end index for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Show items for the current page
    for (let i = startIndex; i < endIndex && i < services.length; i++) {
        services[i].style.display = 'flex';
    }

    // Update the current page and render page buttons
    currentPage = page;
    renderPageButtons(totalPages);
}

function renderPageButtons(totalPages) {
    const pageNumbersContainer = document.getElementById('pageNumbers');
    pageNumbersContainer.innerHTML = ''; // Clear previous buttons

    // Generate a button for each page number
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.onclick = () => showPage(i);

        // Highlight the current page button
        if (i === currentPage) {
            pageButton.classList.add('active');
        }

        pageNumbersContainer.appendChild(pageButton);
    }

    // Disable/enable previous and next buttons based on the current page
    document.querySelector('.pagination > button:first-child').disabled = (currentPage === 1);
    document.querySelector('.pagination > button:last-child').disabled = (currentPage === totalPages);
}

function nextPage() {
    const services = document.querySelectorAll('.service');
    const totalPages = Math.ceil(services.length / itemsPerPage);
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

// Initial display of the first page
showPage(currentPage);