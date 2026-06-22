document.addEventListener("DOMContentLoaded", function () {
    let currentView = 'list';
    let cachedData = [];
    const closeBannerBtn = document.querySelector('.close-banner');
    const topBanner = document.querySelector('.top-banner');
    if (closeBannerBtn && topBanner) {
        closeBannerBtn.addEventListener('click', function () {
            topBanner.style.display = 'none';
        });
    }
    const hotlineIcon  = document.querySelector('.hotline-icon');
    const hotlineModal = document.getElementById('hotline-modal');
    const closeModalBtn = document.querySelector('.close-modal');

    if (hotlineIcon && hotlineModal && closeModalBtn) {
        hotlineIcon.addEventListener('click', () => hotlineModal.style.display = 'block');
        closeModalBtn.addEventListener('click', () => hotlineModal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === hotlineModal) hotlineModal.style.display = 'none';
        });
    }
    const filterPrice = document.getElementById('filter-price');
    const filterYear  = document.getElementById('filter-year');

    if (filterPrice && filterYear) {
        filterPrice.addEventListener('change', function () {
            if (this.value !== "") filterYear.value = "";
        });
        filterYear.addEventListener('change', function () {
            if (this.value !== "") filterPrice.value = "";
        });
    }
    
    const saveSearchBtn = document.querySelector('.btn-save-search');
    if (saveSearchBtn) {
        saveSearchBtn.addEventListener('click', function () {
            this.style.backgroundColor = "#ffdb00";
            this.innerHTML = '<i class="fa-solid fa-bookmark"></i> Đã lưu';
        });
    
    }
    const submitSearchBtn = document.getElementById('btn-submit-search');
    if (submitSearchBtn) {
        submitSearchBtn.addEventListener('click', function (e) {
            e.preventDefault();
            executeFiltering();
        });
    }
    const btnViewList = document.getElementById('btn-view-list');
    const btnViewGrid = document.getElementById('btn-view-grid');

    if (btnViewList && btnViewGrid) {
        btnViewList.addEventListener('click', function () {
            if (currentView === 'list') return;
            currentView = 'list';
            btnViewList.classList.add('active');
            btnViewGrid.classList.remove('active');
            renderCarList(cachedData);
        });

        btnViewGrid.addEventListener('click', function () {
            if (currentView === 'grid') return;
            currentView = 'grid';
            btnViewGrid.classList.add('active');
            btnViewList.classList.remove('active');
            renderCarList(cachedData);
        });
    }
    function executeFiltering() {
        const queryParams = new URLSearchParams();

        const priceSort = document.getElementById('filter-price')?.value;
        const yearSort  = document.getElementById('filter-year')?.value;
        const brand     = document.getElementById('filter-brand')?.value;
        const fuel      = document.getElementById('filter-fuel')?.value;
        const gearbox   = document.getElementById('filter-gearbox')?.value;
        const status    = document.getElementById('filter-status')?.value;

        if (priceSort)  queryParams.append('sortPrice', priceSort);
        if (yearSort)   queryParams.append('sortYear', yearSort);
        if (brand)      queryParams.append('brand', brand);
        if (fuel)       queryParams.append('fuel', fuel);
        if (gearbox)    queryParams.append('gearbox', gearbox);
        if (status)     queryParams.append('status', status);
        const container = document.getElementById('danh-sach-xe');
        if (container) {
            container.innerHTML = `
                <div style="padding: 30px; color: #fff; text-align: center;">
                    <i class="fa-solid fa-spinner fa-spin" style="font-size:24px;"></i>
                    <p style="margin-top:10px;">Đang tải dữ liệu...</p>
                </div>
            `;
        }

        fetch(`http://localhost:5000/api/cars?${queryParams.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Lỗi phản hồi server');
                return response.json();
            })
            .then(data => {
                cachedData = data;
                renderCarList(data);
            })
            .catch(err => {
                console.error("Lỗi kết nối API:", err);
                if (container) {
                    container.innerHTML = `
                        <div style="padding: 20px; color: #fff; text-align: center;">
                            <p>⚠️ Chưa kết nối được API Server (localhost:3000).</p>
                            <p style="font-size: 12px; margin-top:5px; color:#aaa;">Hãy chạy: <code>node backend_csdl.js</code></p>
                        </div>
                    `;
                }
            });
    }
    function renderCarList(data) {
        const carListContainer = document.getElementById('danh-sach-xe');
        if (!carListContainer) return;

        carListContainer.innerHTML = '';

        if (!data || data.length === 0) {
            carListContainer.innerHTML = `
                <div style="padding: 20px; color: #fff; text-align: center;">
                    ⚠️ Không tìm thấy xe phù hợp!
                </div>
            `;
            return;
        }

        if (currentView === 'grid') {
            carListContainer.classList.add('product-list--grid');
        } else {
            carListContainer.classList.remove('product-list--grid');
        }

        data.forEach(xe => {
            const giaSo = Number(xe.gia_xe);
            const giaDinhDang = (!isNaN(giaSo) && giaSo > 0)
                ? giaSo.toLocaleString('vi-VN') + ' đ'
                : 'Liên hệ';

            const kmSach = String(xe.so_km || '').replace(/[^0-9]/g, '');
            const kmSo   = Number(kmSach);
            const kmDinhDang = (!isNaN(kmSo) && kmSo > 0)
                ? kmSo.toLocaleString('vi-VN') + ' km'
                : 'Chưa rõ km';

            const anhXe = xe.anh_xe
                ? xe.anh_xe
                : 'https://placehold.co/140x105?text=No+Image';

            if (currentView === 'grid') {
                const carCard = `
                    <a href="car-detail.html?id=${xe.id}" class="product-item-grid">
                        <div class="product-img-grid">
                            <img 
                                src="${anhXe}" 
                                alt="${xe.ten_xe || 'Ô tô'}"
                                onerror="this.src='https://placehold.co/280x180?text=No+Image'"
                            >
                        </div>
                        <div class="product-info-grid">
                            <h3 class="product-title">${xe.ten_xe || 'Chưa cập nhật tên'}</h3>
                            <div class="product-specs">
                                ${xe.nam_san_xuat || '----'} • ${kmDinhDang}<br>
                                ${xe.nhien_lieu || '---'} • ${xe.hop_so || '---'}
                            </div>
                            <div class="product-price">${giaDinhDang}</div>
                        </div>
                    </a>
                `;
                carListContainer.insertAdjacentHTML('beforeend', carCard);
            } else {
                const carCard = `
                     <a href="car-detail.html?id=${xe.id}" class="product-item">
                        <div class="product-img">
                            <img 
                                src="${anhXe}" 
                                alt="${xe.ten_xe || 'Ô tô'}" 
                                style="width:100%; height:100%; object-fit:cover;"
                                onerror="this.src='https://placehold.co/140x105?text=No+Image'"
                            >
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${xe.ten_xe || 'Chưa cập nhật tên'}</h3>
                            <div class="product-specs">
                                ${xe.nam_san_xuat || '----'} • ${kmDinhDang} • ${xe.nhien_lieu || '---'} • ${xe.hop_so || '---'} • ${xe.xuat_xu || '---'}
                            </div>
                            <div class="product-price">${giaDinhDang}</div>
                        </div>
                    </a>
                `;
                carListContainer.insertAdjacentHTML('beforeend', carCard);
            }
        });
    }
    executeFiltering();
});