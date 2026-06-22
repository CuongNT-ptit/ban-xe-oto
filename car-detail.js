const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`http://localhost:5000/api/cars/${id}`)
.then(res => res.json())
.then(xe => {
    document.getElementById("tenXe").innerText = xe.ten_xe;
    document.getElementById("giaXe").innerText = Number(xe.gia_xe).toLocaleString('vi-VN') + " đ";
    document.getElementById("hangXe").innerText = xe.hang_xe;
    document.getElementById("namSX").innerText = xe.nam_san_xuat;
    document.getElementById("nhienLieu").innerText = xe.nhien_lieu;
    document.getElementById("hopSo").innerText = xe.hop_so;
    document.getElementById("mainImage").src = xe.hinh_anh_1;
    
    const thumbs = [xe.hinh_anh_1, xe.hinh_anh_2, xe.hinh_anh_3];
    thumbs.forEach((img, i) => {
        const el = document.getElementById(`img${i+1}`);
        if(el) {
            el.src = img;
            el.onclick = () => document.getElementById("mainImage").src = img;
        }
    });

    const modal = document.getElementById("contactModal");
    document.querySelector('.btn-contact').onclick = () => modal.style.display = "block";
    document.querySelector('.close').onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };
});

fetch("http://localhost:5000/api/cars")
.then(res => res.json())
.then(data => {
    const box = document.getElementById("otherCars");
    data.filter(x => x.id != id).slice(0, 4).forEach(xe => {
        box.innerHTML += `
            <a href="car-detail.html?id=${xe.id}" class="other-car-card">
                <img src="${xe.hinh_anh_1}">
                <div class="other-car-info">
                    <div class="other-car-name">${xe.ten_xe}</div>
                    <div class="other-car-price">${Number(xe.gia).toLocaleString('vi-VN')} đ</div>
                </div>
            </a>
        `;
    });
});