from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from app.api.v1.endpoints import router as api_router

app = FastAPI(
    title="BIZLAB TSUE PRO",
    description="TDIU Virtual Biznes Simulyatori & Ko'p Modulli Tadqiqot Laboratoriyasi",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/", tags=["Dashboard"])
def serve_dashboard():
    return FileResponse("static/index.html", headers={"Cache-Control": "no-cache, no-store, must-revalidate"})

@app.get("/scoreboard", tags=["Scoreboard"])
def serve_scoreboard():
    return FileResponse("static/scoreboard.html", headers={"Cache-Control": "no-cache, no-store, must-revalidate"})

@app.get("/health", tags=["Status"])
def health_check():
    return {"status": "faol", "app": "BIZLAB TSUE PRO", "modules": 6}
