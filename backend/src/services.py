# src/services.py
import json
import logging
from typing import List
from fastapi import HTTPException
from src.models import Chat, Message
from src.schemas import ChatResponse
from src.ai import chat_completion_request

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# In-memory storage
chats: List[Chat] = []
next_chat_id: int = 1

def create_chat() -> Chat:
    global next_chat_id
    chat = Chat(id=next_chat_id)
    next_chat_id += 1
    chats.append(chat)
    return chat

def get_chat(chat_id: int) -> Chat:
    for chat in chats:
        if chat.id == chat_id:
            return chat
    return None

def add_message_to_chat(chat_id: int, message: Message) -> Chat:
    chat = get_chat(chat_id)
    if chat:
        chat.messages.append(message)
    return chat

system_prompt = """
You are an AI assistant for a company specializing in conversational technology. Your job is to provide concise, actionable advice based on user queries. Ensure responses are relevant and helpful, considering the context of sales, customer engagement, and efficient communication. Keep responses professional and to the point.
"""

def generate_response(chat_id: int, user_message: str) -> ChatResponse:
    chat = get_chat(chat_id)
    if not chat:
        chat = create_chat()  # Create a new chat if it doesn't exist

    # Add user message to chat
    user_message_obj = Message(sender="user", content=user_message)
    add_message_to_chat(chat_id, user_message_obj)
    
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    functions = [
        {
            "name": "generate_advice",
            "description": "Generates advice based on the given context and query.",
            "parameters": {
                "type": "object",
                "properties": {
                    "advice_text": {"type": "string", "description": "The generated advice text."}
                },
                "required": ["advice_text"]
            }
        }
    ]
    function_call = {"name": "generate_advice"}

    try:
        logger.debug("Sending request to chat_completion_request with messages: %s", messages)
        chat_response = chat_completion_request(messages, functions=functions, function_call=function_call)
        logger.debug("Received response from chat_completion_request: %s", chat_response)
        assistant_message = chat_response.json()["choices"][0]["message"]
    except KeyError as e:
        logger.error("KeyError: %s", str(e))
        raise HTTPException(status_code=500, detail="Error processing the request.")
    except Exception as e:
        logger.error("Exception: %s", str(e))
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

    if assistant_message.get("function_call"):
        arguments = json.loads(assistant_message.get("function_call").get('arguments'))
        advice_text: str = arguments.get("advice_text") or "Advice generation failed"
        
        # Add assistant message to chat
        assistant_message_obj = Message(sender="ai", content=advice_text)
        add_message_to_chat(chat.id, assistant_message_obj)
        
        return ChatResponse(id=chat.id, messages=chat.messages)
    else:
        raise HTTPException(status_code=500, detail="Advice generation failed")
    
def generate_suggestions(chat_id: int, user_message: str) -> ChatResponse:
    chat = get_chat(chat_id)
    if not chat:
        chat = create_chat()  # Create a new chat if it doesn't exist

    # Add user message to chat
    user_message_obj = Message(sender="user", content=user_message)
    add_message_to_chat(chat_id, user_message_obj)
    
    messages = [
        {"role": "system", "content": "You are a smart suggestion generation machine. Generate suggestions for the user based on their query. Keep it 2-3 words max only"},
        {"role": "user", "content": user_message}
    ]

    functions = [
        {
            "name": "generate_suggestion",
            "description": "Generates suggestions based on the given context and query. Keep it super short like not more than 2-3 words.",
            "parameters": {
                "type": "object",
                "properties": {
                    "suggested_text": {"type": "string", "description": "The generated suggested text."}
                },
                "required": ["suggested_text"]
            }
        }
    ]
    function_call = {"name": "generate_suggestion"}

    try:
        logger.debug("Sending request to chat_completion_request with messages: %s", messages)
        chat_response = chat_completion_request(messages, functions=functions, function_call=function_call)
        logger.debug("Received response from chat_completion_request: %s", chat_response)
        assistant_message = chat_response.json()["choices"][0]["message"]
    except KeyError as e:
        logger.error("KeyError: %s", str(e))
        raise HTTPException(status_code=500, detail="Error processing the request.")
    except Exception as e:
        logger.error("Exception: %s", str(e))
        raise HTTPException(status_code=500, detail="An unexpected error occurred.")

    if assistant_message.get("function_call"):
        arguments = json.loads(assistant_message.get("function_call").get('arguments'))
        suggested_text: str = arguments.get("suggested_text") or "Suggestion generation failed"
        
        # Add assistant message to chat
        assistant_message_obj = Message(sender="ai", content=suggested_text)
        add_message_to_chat(chat.id, assistant_message_obj)
        
        return ChatResponse(id=chat.id, messages=chat.messages)
    else:
        raise HTTPException(status_code=500, detail="Suggestion generation failed")