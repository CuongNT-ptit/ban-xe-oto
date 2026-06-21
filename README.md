# BÀI TẬP LỚN: DỰ ÁN WEB BÁN XE Ô TÔ
* **Môn học:** Lập trình với ngôn ngữ JavaScript
---

## 🛠️ Hướng dẫn cài đặt và triển khai ứng dụng (Deployment Guide)

Để khởi chạy dự án này dưới môi trường cục bộ (Localhost), xin vui lòng thực hiện theo các bước kỹ thuật sau:

### 1. Cài đặt các thư viện phụ thuộc (Dependencies)
Mở cửa sổ dòng lệnh (Terminal) tại thư mục gốc của dự án và chạy lệnh sau để tự động sinh lại thư mục `node_modules`:
```bash
npm install
2. Khởi tạo Cơ sở dữ liệu
Sử dụng hệ quản trị cơ sở dữ liệu (MySQL / XAMPP...).

Tạo một database mới và tiến hành Import file dữ liệu cấu trúc csdl.sql (nằm trong thư mục gốc của dự án) vào hệ thống.

3. Cấu hình kết nối Database
Nếu thông số tài khoản hoặc mật khẩu database trên thiết bị chấm bài có sự thay đổi, xin vui lòng điều chỉnh lại cấu hình kết nối tại file backend_csdl.js.

4. Khởi động ứng dụng
Chạy lệnh sau tại Terminal để khởi động server Node.js:

Bash
node backend_csdl.js
Sau khi server khởi động thành công, mở file web.html trên trình duyệt để trải nghiệm giao diện ứng dụng.