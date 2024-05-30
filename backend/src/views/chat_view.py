# src/views/chat_view.py
from fastapi import APIRouter, HTTPException
from src.schemas import MessageCreate, ChatResponse
from src.services import generate_response, generate_suggestions

router = APIRouter()
@router.post("/chats/{chat_id}/messages", response_model=ChatResponse)
def send_message(chat_id: int, message: MessageCreate):
    try:
        # import ipdb; ipdb.set_trace()
        response = generate_response(chat_id, message.content)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/chats/{chat_id}/suggestions", response_model=ChatResponse)
def send_message(chat_id: int, message: MessageCreate):
    try:
        response = generate_suggestions(chat_id, message.content)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))