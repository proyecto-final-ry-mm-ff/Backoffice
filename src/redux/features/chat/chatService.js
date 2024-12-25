import { GetBearerToken } from '../../../Services/helperService';
import { store } from '../../store';
import { assignChat, addMessageToChat } from './chatSlice';

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

export const saveChat = async (token, chat) => {
    // const token = GetBearerToken(); //TODO:  Hay que manejar una lógica de pedir refresh token si este expiró
    // console.log("Voy a guardar la instancia de chat...");
    // console.log({ chat });
    const chatUpdateDto = {
        chatId: chat.id,
        customerId: chat.customer.id,
        status: 4,
        messages: chat.messages
    };
    const response = await fetch(`${urlChat}/chat/${chat.id}`, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        method: "PUT",
        body: JSON.stringify(chatUpdateDto),
    });

    const parsedResponse = await response.json();
    // console.log({ parsedResponse });
    if (response.ok) {
        return true;
    }

    return false;

}