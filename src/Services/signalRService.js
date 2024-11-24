import { store } from '../redux/store'
import { addChat, addMessageToChat, setChats } from '../redux/features/chatSlice';

import * as signalR from '@microsoft/signalr'

const wssUrl = "http://localhost:5056/chat-hub";


// Conexión al hub de SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl(wssUrl)
    .build();


// Método para conectar al operador y recibir los chats pendientes
connection.on("PendingChats", (chats) => {
    console.log("Chats pendientes:", chats);
    const chatObjs = chats.map(c => {
        const miNuevoChat = { id: c };
        return miNuevoChat
    });

    store.dispatch(setChats(chatObjs));
});

connection.on("NewChatRequest", (chatId) => {
    const chat = { id: chatId }
    store.dispatch(addChat(chat));
});

connection.on("ReceiveMessage", (messageDto) => {
    console.log({ messageDto });
    store.dispatch(addMessageToChat(messageDto));
});


export const connectToHub = async () => {
    try {
        await connection.start();
        console.log("1 - Conectado como operador al Hub de SignalR");
        await connection.invoke("OperatorConnect");
    } catch (err) {
        console.error("Error al conectar con el Hub de SignalR", err);
        //  setTimeout(startConnection, 5000); // Reintento en caso de fallo
    }
}

export const assignOperatorToChat = async (selectedChatId) => {
    try {
        await connection.invoke("AssignOperatorToChat", selectedChatId);
    } catch (err) {
        console.error("Error asignar operador:", err);
    }
}

// Método para enviar un mensaje al hub
export const sendMessageToChat = async (chatId, senderTypeId, message) => {
    try {
        await connection.invoke("SendMessageToChat", chatId, senderTypeId, message);
        console.log(`Mensaje enviado existosamente // Chat: ${chatId}, Tipo:${senderTypeId}, Mensaje:${message}`);
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
    }
};


// export const endChat = async (chatInstance) => {
//     try {
//         await connection.invoke("EndChat", chatInstance);
//         console.log(`El chat termino`);
//     } catch (err) {
//         console.error("Error al enviar mensaje:", err);
//     }
// };