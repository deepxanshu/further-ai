from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        logger.info(f"WebSocket connection established: {websocket.client}, Total connections: {len(self.active_connections)}")

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        logger.info(f"WebSocket connection closed: {websocket.client}, Total connections: {len(self.active_connections)}")

    async def broadcast(self, message: str, sender: WebSocket):
        for connection in self.active_connections:
            if connection != sender:
                await connection.send_text(message)
                logger.info(f"Broadcasted message to {connection.client}: {message}")

manager = ConnectionManager()

@router.websocket("/ws/chat/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: int):
    await manager.connect(websocket)
    try:
        while True:
            # import ipdb; ipdb.set_trace()
            data = await websocket.receive_text()
            logger.info(f"Received message: {websocket.client} - {data}")
            await manager.broadcast(f'{data}',
                                    # websocket
                                    )
    except WebSocketDisconnect:
        manager.disconnect(websocket)