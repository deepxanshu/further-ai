import axios from 'axios';

const API_URL = 'https://further-ai-backend.vercel.app';

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