import { GetBearerToken } from './helperService';
import { store } from '../redux/store';
import { assignChat, addMessageToChat } from '../redux/features/chat/chatSlice';

const urlChat = "http://localhost:5015/chat";

// Obtener lista de chats
export const getChats = async () => {
    const token = GetBearerToken();
    const response = await fetch(urlChat, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Error al obtener chats');
    return await response.json();
};

// Enviar mensaje a un chat
export const sendChatMessage = async (chatId, message) => {
    const token = GetBearerToken();
    const response = await fetch(`${urlChat}/${chatId}/messages`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content: message })
    });
    if (!response.ok) throw new Error('Error al enviar mensaje');
    return await response.json();
};

// Asignar un operador al chat
export const assignOperatorToChat = async (chatId, userId) => {
    const token = GetBearerToken();
    const response = await fetch(`${urlChat}/${chatId}/assign`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
    });
    if (!response.ok) throw new Error('Error al asignar operador');
    store.dispatch(assignChat({ chatId, userId }));
};
