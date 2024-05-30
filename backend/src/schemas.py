# src/schemas.py
from pydantic import BaseModel
from typing import List
from src.models import Message

class MessageCreate(BaseModel):
    content: str

class ChatResponse(BaseModel):
    id: int
    messages: List[Message]