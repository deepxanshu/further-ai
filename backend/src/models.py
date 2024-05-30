# src/models.py
from pydantic import BaseModel
from typing import List

class Message(BaseModel):
    sender: str
    content: str

class Chat(BaseModel):
    id: int
    messages: List[Message] = []