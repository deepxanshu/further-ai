# src/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.views import chat_view
from src.websocket import router as websocket_router

app = FastAPI()

# CORS configuration

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_view.router)
app.include_router(websocket_router)

@app.get("/")
def read_root():
    return {"message": "up and running!"}