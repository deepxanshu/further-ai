import axios from 'axios';

const API_URL = 'https://f88e-2401-4900-1c68-ad1b-9ccb-5226-5615-51ad.ngrok-free.app';

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