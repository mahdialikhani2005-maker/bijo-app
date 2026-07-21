from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.database import engine, Base

# Import models
from app.models import user, heart, progress, premium, subscription

# Import routes
from app.routes import auth
from app.routes import progress as progress_routes
from app.routes import heart as heart_routes
from app.routes import premium as premium_routes

# ساخت جداول دیتابیس
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Language Learning App API",
    debug=True
)

# تنظیم CORS برای اتصال فرانت‌اند
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Routes
# -------------------------

app.include_router(auth.router, prefix="/api")
app.include_router(progress_routes.router, prefix="/api")
app.include_router(heart_routes.router, prefix="/api")
app.include_router(premium_routes.router, prefix="/api")

# -------------------------
# Health Check
# (این باید قبل از مسیر عمومی {file_name} تعریف بشه، وگرنه
# اون مسیر جلوشو می‌گیره و همیشه "Not Found" برمی‌گردونه)
# -------------------------
@app.get("/health")
def health():
    return {"status": "ok"}

# -------------------------
# Static Files
# -------------------------
BASE_DIR = Path(__file__).resolve().parent.parent.parent

app.mount("/static", StaticFiles(directory=str(BASE_DIR)), name="static")

@app.get("/")
async def serve_home():
    return FileResponse(str(BASE_DIR / "home.html"))

@app.get("/{file_name}")
async def serve_html(file_name: str):
    file_path = BASE_DIR / file_name
    if file_path.exists() and file_name.endswith(".html"):
        return FileResponse(str(file_path))
    return {"detail": "Not Found"}