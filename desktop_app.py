import webview
import threading
import uvicorn
import time
from app.main import app

def start_server():
    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="warning")

if __name__ == '__main__':
    # Backendni alohida oqimda (thread) ishga tushirish
    t = threading.Thread(target=start_server, daemon=True)
    t.start()
    
    # Server to'liq ko'tarilishi uchun qisqa pauza
    time.sleep(1.5)

    # Ilova oynasini ochish
    window = webview.create_window(
        title="BIZLAB TSUE — Virtual Biznes Simulyatori",
        url="http://127.0.0.1:8000",
        width=1320,
        height=860,
        min_size=(1024, 700),
        confirm_close=True
    )
    webview.start()
