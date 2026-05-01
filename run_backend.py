import multiprocessing
import uvicorn
import os
import sys

# This tells the packaged EXE how to find your files
if getattr(sys, 'frozen', False):
    sys.path.append(sys._MEIPASS)

from core_service.src.api.main import app

if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run(app, host="127.0.0.1", port=8000)