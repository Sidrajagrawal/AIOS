import uvicorn
import multiprocessing
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core_service.src.api.routes import router

app = FastAPI(title="AI-OS Core Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")

if __name__ == "__main__":
    multiprocessing.freeze_support()
    uvicorn.run(app, host="0.0.0.0", port=8000)
    # uvicorn.run("src.api.main:app", host="0.0.0.0", port=8000, reload=True)