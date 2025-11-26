from src.backend.server import create_app
from dotenv import load_dotenv
import os
import sys
import threading
import webview

load_dotenv()

def resource_path(relative):
    if hasattr(sys, "_MEIPASS"):
        base_path = sys._MEIPASS
    else:
        base_path = os.path.abspath(".")

    full_path = os.path.join(base_path, relative)
    return full_path.replace("\\", "/")

def start_flask():
    app = create_app()
    app.run(
        port=8765,
        debug=False,
        use_reloader=False
    )

if __name__ == "__main__":
    threading.Thread(target=start_flask, daemon=True).start()
    frontend_index = resource_path("frontend/dist/index.html")

    if not os.path.exists(frontend_index):
        frontend_index = os.path.abspath("src/frontend/dist/index.html")
    
    webview.create_window(
        title="Mi App TODO",
        url=frontend_index,
        width=1024,
        height=768,
        maximized=True,
        min_size=(800, 600)
    )
    
    webview.start()