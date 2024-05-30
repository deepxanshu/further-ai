import { useEffect, useState, useRef } from 'react';

interface Message {
    text: string;
    isResponse: boolean;
}

const useWebSocket = (chatId: number) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;

    useEffect(() => {
        const connectWebSocket = () => {
            const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}`);
            
            ws.onopen = () => {
                console.log("WebSocket is open now.");
                reconnectAttempts.current = 0;
            };
            
            ws.onmessage = (event) => {
                try {
                    const message = JSON.parse(event.data);
                    setMessages((prev) => {
                        if (!prev.find((msg) => msg.text === message.content && msg.isResponse === message.isResponse)) {
                            return [...prev, { text: message.content, isResponse: message.isResponse }];
                        }
                        return prev;
                    });
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            };
            
            ws.onerror = (error) => {
                console.error("WebSocket error:", error);
                ws.close();
            };
            
            ws.onclose = () => {
                console.log("WebSocket is closed now.");
                if (reconnectAttempts.current < maxReconnectAttempts) {
                    reconnectAttempts.current += 1;
                    setTimeout(connectWebSocket, 1000);
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

    const sendMessage = (message: string, isResponse: boolean = false) => {
        const messageObject = { text: message, isResponse };
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ content: message, isResponse }));
        } else {
            console.log("WebSocket is not open. Unable to send message.");
        }
        setMessages((prev) => [...prev, messageObject]);
    };

    return { messages, sendMessage };
};

export default useWebSocket;