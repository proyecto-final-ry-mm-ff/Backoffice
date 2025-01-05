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

export const saveChat = async (token, chat) => {
    // const token = GetBearerToken(); //TODO:  Hay que manejar una lógica de pedir refresh token si este expiró
    console.log("Voy a guardar la instancia de chat...");
    console.log({ chat });
    token = GetBearerToken();
    const chatUpdateDto = {
        chatId: chat.id,
        customerId: chat.customerId,
        status: 4, //4 es terminado
        messages: []
    };
    const response = await fetch(`${urlChat}/${chat.id}`, {
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

export const saveMessageToChat = async (chatId, message) => {
    const token = GetBearerToken();
    try {
        const response = await fetch(`${urlChat}/${chatId}/message`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            throw new Error("No se pudo guardar el mensaje en la base de datos.");
        }

        console.log("Mensaje guardado en la base de datos.");
    } catch (err) {
        console.error("Error al guardar el mensaje:", err);
    }
};
