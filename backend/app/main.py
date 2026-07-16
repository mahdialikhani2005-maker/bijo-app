from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

# ----------------------------------------------
# ساخت اپلیکیشن FastAPI
# ----------------------------------------------
app = FastAPI(
    title="Bijo Language App API",
    description="API for Bijo language learning app",
    version="1.0.0",
    debug=False  # در تولید (production) دیباگ باید خاموش باشد
)

# ----------------------------------------------
# تنظیمات CORS برای اتصال فرانت‌اند
# ----------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # در تولید، بهتر است دامنه خاص را بگذارید
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------------------------
# مسیرهای API
# ----------------------------------------------

# یک مسیر ساده برای سلام (جهت تست)
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from Bijo API!"}

# مسیر سلامت (Health Check) برای Render
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "bijo-backend"}

# ----------------------------------------------
# سرویس‌دهی فایل‌های استاتیک (HTML, CSS, JS)
# ----------------------------------------------

# مسیر پوشه اصلی پروژه (ریشه)
# توجه: این مسیر بر اساس جایی که فایل main.py اجرا می‌شود، تنظیم می‌شود
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # مسیر پوشه app
ROOT_DIR = os.path.dirname(BASE_DIR)  # مسیر پوشه backend
PROJECT_ROOT = os.path.dirname(ROOT_DIR)  # مسیر ریشه پروژه (جایی که home.html هست)

# سرویس فایل‌های استاتیک (اگر پوشه‌ای برای آنها دارید)
# app.mount("/static", StaticFiles(directory=os.path.join(PROJECT_ROOT, "static")), name="static")

# ----------------------------------------------
# سرویس صفحات HTML
# ----------------------------------------------

@app.get("/")
async def serve_home():
    """سرویس صفحه اصلی (home.html)"""
    home_path = os.path.join(PROJECT_ROOT, "home.html")
    if os.path.exists(home_path):
        return FileResponse(home_path)
    return {"error": "home.html not found"}

@app.get("/{file_name:path}")
async def serve_html(file_name: str):
    """سرویس تمام فایل‌های HTML و فایل‌های دیگر"""
    # جلوگیری از دسترسی به فایل‌های حساس
    if file_name.startswith(".") or ".." in file_name:
        return {"error": "Access denied"}

    file_path = os.path.join(PROJECT_ROOT, file_name)
    
    # اگر فایل وجود دارد و HTML است یا فایل استاتیک (CSS, JS, ...)
    if os.path.exists(file_path) and not os.path.isdir(file_path):
        return FileResponse(file_path)
    
    return {"error": "File not found"}

# ----------------------------------------------
# اجرا (برای اجرای مستقیم با python main.py)
# ----------------------------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)