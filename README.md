# 📚 Hệ Thống Tra Cứu Học Phí Online

Hệ thống tra cứu học phí trực tuyến với dữ liệu từ Google Sheets, deploy trên Vercel.

## 🚀 Cấu Trúc Thư Mục

```
project/
├── index.html              # Giao diện chính
├── api/
│   └── students.js         # API endpoint (serverless function)
├── .env.example            # Mẫu file cấu hình
├── .gitignore              # Loại trừ file nhạy cảm
└── README.md               # Hướng dẫn
```

## 📋 Yêu Cầu

- Tài khoản GitHub
- Tài khoản Vercel (free)
- Google Sheets API Key
- Google Sheet ID

## 🔧 Hướng Dẫn Setup

### 1. Chuẩn bị Google Sheets

1. Tạo hoặc mở Google Sheet của bạn
2. Đảm bảo sheet có các cột sau (theo thứ tự):
   - ID
   - Tên học sinh
   - Lớp
   - Số buổi
   - Số tiền
   - Nội dung chuyển khoản
   - Ghi chú
   - Trạng thái
   - QR Code URL

3. Chia sẻ sheet với quyền "Anyone with the link can view"

### 2. Lấy Google Sheets API Key

1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo project mới hoặc chọn project hiện có
3. Bật Google Sheets API
4. Tạo credentials → API Key
5. (Khuyến nghị) Giới hạn API key chỉ cho Google Sheets API và domain của bạn

### 3. Lấy Google Sheet ID

Từ URL của Google Sheet:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_Ở_ĐÂY/edit
```
Copy phần `SHEET_ID_Ở_ĐÂY`

### 4. Deploy lên Vercel

#### Bước 1: Push code lên GitHub

```bash
# Tạo repository mới trên GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

#### Bước 2: Import vào Vercel

1. Đăng nhập [Vercel](https://vercel.com)
2. Click **"Add New Project"**
3. Import repository từ GitHub
4. Click **"Deploy"**

#### Bước 3: Thêm Environment Variables

Trong Vercel Dashboard:

1. Vào **Settings** → **Environment Variables**
2. Thêm các biến sau:

```
GOOGLE_SHEET_ID = your_sheet_id_here
GOOGLE_API_KEY = your_api_key_here
SHEET_NAME = Sheet1
```

3. Click **"Save"**
4. **Redeploy** project để áp dụng biến môi trường

## 🔐 Bảo Mật

✅ **ĐÚNG:**
- API Key và Sheet ID được lưu trong Vercel Environment Variables
- File `.env` được thêm vào `.gitignore`
- Chỉ có mã nguồn được push lên GitHub

❌ **SAI:**
- KHÔNG bao giờ commit file `.env` lên GitHub
- KHÔNG hardcode API Key trong code
- KHÔNG chia sẻ API Key công khai

## 📝 Cập Nhật Dữ Liệu

Chỉ cần cập nhật Google Sheet, website sẽ tự động lấy dữ liệu mới mỗi lần refresh.

## 🛠️ Development Local

Nếu muốn test trên máy local:

1. Tạo file `.env`:
```bash
cp .env.example .env
```

2. Điền thông tin vào `.env`:
```
GOOGLE_SHEET_ID=your_actual_sheet_id
GOOGLE_API_KEY=your_actual_api_key
SHEET_NAME=Sheet1
```

3. Cài Vercel CLI:
```bash
npm i -g vercel
```

4. Chạy local:
```bash
vercel dev
```

## ❓ Troubleshooting

### Lỗi: "Missing environment variables"
- Kiểm tra đã thêm đầy đủ environment variables trong Vercel
- Nhớ **redeploy** sau khi thêm biến môi trường

### Lỗi: "Failed to fetch data"
- Kiểm tra Google Sheet đã được chia sẻ công khai
- Kiểm tra API Key còn hiệu lực
- Kiểm tra Sheet ID chính xác

### Lỗi: "Method not allowed"
- API endpoint chỉ chấp nhận GET request
- Không cần thêm gì khi gọi `/api/students`

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:
1. Vercel deployment logs
2. Browser console (F12)
3. Google Sheets API quota

## 📄 License

MIT License - Free to use

---

**Lưu ý:** Đảm bảo đã thêm tất cả environment variables trước khi deploy!
