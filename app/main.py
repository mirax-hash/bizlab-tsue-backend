import os
from pathlib import Path
from fastapi import FastAPI, Response
from fastapi.responses import FileResponse, HTMLResponse

app = FastAPI(title="BIZLAB TSUE PRO")

# Fayllarni ~/bizlab-backend yoki app/ papkasidan qidirish
def find_file(filename: str) -> Path | None:
    candidates = [
        Path(os.getcwd()) / filename,
        Path(__file__).resolve().parent / filename,
        Path(__file__).resolve().parent.parent / filename,
    ]
    for p in candidates:
        if p.is_file():
            return p
    return None

@app.api_route("/", methods=["GET", "HEAD"])
async def read_index():
    target = find_file("index.html")
    if target:
        return FileResponse(str(target), media_type="text/html")
    return HTMLResponse("<h2>index.html fayli topilmadi. Faylni loyiha papkasiga joylashtiring.</h2>", status_code=404)

@app.api_route("/style.css", methods=["GET", "HEAD"])
async def get_style():
    target = find_file("style.css")
    if target:
        return FileResponse(str(target), media_type="text/css")
    return Response(content="", media_type="text/css", status_code=404)

@app.api_route("/script.js", methods=["GET", "HEAD"])
async def get_script():
    target = find_file("script.js")
    if target:
        return FileResponse(str(target), media_type="application/javascript")
    return Response(content="", media_type="application/javascript", status_code=404)

@app.api_route("/favicon.ico", methods=["GET", "HEAD"])
async def favicon():
    target = find_file("favicon.ico")
    if target:
        return FileResponse(str(target))
    return Response(status_code=204)
