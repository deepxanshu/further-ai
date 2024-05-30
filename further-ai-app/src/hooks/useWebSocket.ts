import { useEffect, useState, useRef } from 'react';

const useWebSocket = (chatId: number) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}`);
            
            ws.onopen = () => {
                console.log("WebSocket is open now.");
                reconnectAttempts.current = 0; // Reset reconnect attempts on successful connection
            };
            
            ws.onmessage = (event) => {
                const message = event.data;
                setMessages((prev) => [...prev, message]);
            };
            
            ws.onclose = () => {
                console.log("WebSocket is closed now.");
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    reconnectAttempts.current += 1;
                    setTimeout(connectWebSocket, 1000); // Attempt to reconnect after 1 second
                }
            };
            
            setSocket(ws);
        };

        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [chatId]);

    const sendMessage = (message: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else {
            console.log("WebSocket is not open. Unable to send message.");
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;