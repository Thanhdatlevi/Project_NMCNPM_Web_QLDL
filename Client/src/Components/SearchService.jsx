import React, {useEffect,useState} from 'react';
import '../Styles/SearchService.css';
const SearchService = () => {
    const [filters, setFilters] = useState({
        service:"",
        input: "",
        location: "",
        rate: "",
    });
    const [data, setData] = useState([]); // Dữ liệu đã fetch
    const [locations, setLocations] = useState([]); // Dữ liệu đã fetch
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 6; // Số lượng item trên mỗi trang
    const getLocations = async ()=>{
        const response = await fetch(`/location/allLocation`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        setLocations(await response.json())
    }   
    // Hàm fetch dữ liệu
    const handleFetch = async () => {
        try {
            const queryParams = new URLSearchParams({ ...filters }).toString();
            let fetchedData = [];

            if (filters.service === '') {
                const [attractionResponse, hotelResponse, resResponse] = await Promise.all([
                    fetch(`/attraction/getFilterattraction?${queryParams}`),
                    fetch(`/hotel/getFilterhotel?${queryParams}`),
                    fetch(`/res/getFilterres?${queryParams}`),
                ]);

                const [attractionData, hotelData, resData] = await Promise.all([
                    attractionResponse.json(),
                    hotelResponse.json(),
                    resResponse.json(),
                ]);

                fetchedData = [...attractionData, ...hotelData,...resData];
            } else {
                const response = await fetch(`/${filters.service}/getFilter${filters.service}?${queryParams}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                fetchedData = await response.json();
            }

            setData(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Cập nhật filters
    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: prevFilters[key] === value ? "" : value,
        }));
    };

    // Xử lý chuyển trang
    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    };

    const renderPageButtons = () => {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`page-button ${i === currentPage ? 'active' : ''}`}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    // useEffect để gọi fetch lần đầu
    useEffect(() => {
        setCurrentPage(1);
        addCheckedToRadioInputs();
        handleFetch();
        getLocations();
    }, [filters]);

    const addCheckedToRadioInputs = () => {
        // Lấy tất cả các thẻ input type="radio"
        const radioInputs = document.querySelectorAll('input[type="radio"]');
    
        // Duyệt qua từng thẻ input và thêm thuộc tính checked
        radioInputs.forEach((input) => {
            const name = input.getAttribute('name');
            const value = input.getAttribute('value');
    
            // So sánh giá trị name và value với filters
            if (filters[name] === value) {
                input.checked = true;
            } else {
                input.checked = false;
            }
        });
    };
    const changeInput = () => {
        const inputElement = document.getElementById("searchInf");
        if (inputElement) {
            handleFilterChange("input", inputElement.value);
        }
    };
    // Initial display of the first page
  return (
    <section id="searchService">
        <div id="main_search">
            
            <div id="map_web">
                <div>
                    <p>
                        <a href="../../index.html">Home</a> /
                        <a href="searchService.html">Service</a>
                    </p>
                </div>
                <div ></div>
            </div>
            <h1>Search Service</h1>

            <div id="search-zone">
                <div class="search1">
                    <div class="searchContainer">
                        <label for="searchInf" class="search-label">Thông tin</label>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" id="searchInf" class="search-input" placeholder="Search..."/>
                    </div>
                </div>
                <a href="#!" id="btnSearch" onClick={changeInput}>Search</a>
            </div>
        </div>

        <div id="mainContent">
            <div id="filter">
                <div class="facility opt">
                    <h3>Type of guests</h3>
                    <label>
                        <input type="radio" name="service" value="res" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Restaurant
                    </label>
                    <label>
                        <input type="radio" name="service" value="hotel" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Hotel
                    </label>
                    <label>
                        <input type="radio" name="service" value="attraction" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Attraction
                    </label>
                </div>
                <div class="location opt">
                    <h3>Location of Service</h3>
                    {locations.map((location)=>{
                        return(
                            <label>
                                <input type="radio" name="location" value={location.location_name} onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                                {location.location_name}
                            </label>
                        )
                    })}
                    {/* <label>
                        <input type="radio" name="location" value="Hà Nội" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Hà Nội
                    </label>
                    <label>
                        <input type="radio" name="location" value="Hồ Chí Minh" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Hồ Chí Minh
                    </label>
                    <label>
                        <input type="radio" name="location" value="Phan Thiết" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Phan Thiết
                    </label>
                    <label>
                        <input type="radio" name="location" value="Quảng Ninh" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Quảng Ninh
                    </label>
                    <label>
                        <input type="radio" name="location" value="Đà Nẵng" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Đà Nẵng
                    </label>
                    <label>
                        <input type="radio" name="location" value="Quảng Nam" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Quảng Nam
                    </label>
                    <label>
                        <input type="radio" name="location" value="Kiên Giang" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Kiên Giang
                    </label>
                    <label>
                        <input type="radio" name="location" value="Cao Bằng" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Cao Bằng
                    </label>
                    <label>
                        <input type="radio" name="location" value="Hà Giang" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Hà Giang
                    </label>
                    <label>
                        <input type="radio" name="location" value="Lâm Đồng" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        Lâm Đồng
                    </label> */}
                </div>
                <div class="rate opt">
                    <h3>Rate of Service</h3>
                    <label>
                        <input type="radio" name="rate" value="0" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        0 - 1 Star
                    </label>
                    <label>
                        <input type="radio" name="rate" value="1" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        1- 2 Star
                    </label>
                    <label>
                        <input type="radio" name="rate" value="2" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        2 - 3 Star
                    </label>
                    <label>
                        <input type="radio" name="rate" value="3" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        3 - 4 Star
                    </label>
                    <label>
                        <input type="radio" name="rate" value="4" onClick={(e) => handleFilterChange(e.target.name, e.target.value)}/>
                        4 - 5 Star
                    </label>
                </div>
            </div>
            <div id="list">
                {paginateData().map((item, index)=>{
                    return(
                        <div key={index} class="service">
                            <a href="#!"><img src={item.img_url} alt=""/></a>
                            <div class="content">
                                <div class="inf">
                                    <h2>{item.attraction_name||item.facility_name}</h2>
                                    <p class="location"><i class="fa-solid fa-location-dot"></i> Location: {item.location_name}</p>
                                    <p><i class="fa-solid fa-star"></i> {item.rating} Star</p>
                                    <p>Contact: {item.contact}</p>
                                </div>
                                <div class="bookZone">
                                    <p class="detailPrice">$300 per night</p>
                                    <p>excl.tax</p>
                                    <a href={`/servicepage/${item.attraction_id||item.restaurant_id||item.hotel_id}`} value="{item.contact}" class="btnDetail">Veiw Detail</a>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {/* Phân trang */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {renderPageButtons()}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                >
                    Next
                </button>
            </div>
            </div>
            
        </div>
    </section>
  );
};

export default SearchService;