import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const sendMessage = async (chatId: number, message: string) => {
    const response = await axios.post(`${API_URL}/chats/${chatId}/messages`, 
        { content: message },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    return response.data;
};