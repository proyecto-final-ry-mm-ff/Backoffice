import { store } from '../redux/store'
import { addChat, setChats } from '../redux/features/chatSlice';

import * as signalR from '@microsoft/signalr'

const wssUrl = "http://localhost:5056/chat-hub";
const OperatorContext = {};


// Conexión al hub de SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl(wssUrl)
    .build();
// Método para conectar al operador y recibir los chats pendientes

//Cuando conecto deberia mandar id de operador y JWT 
connection.start().then(() => {

    console.log('SignalR: ' + connection.state);

    connection.invoke("OperatorConnect")
        .catch(err => console.error("Error al conectar al operador:", err));
}).catch(err => console.error("Error de conexión:", err));


// Recibe la lista de chats pendientes
connection.on("PendingChats", (chats) => {

    console.log("Chats pendientes:", chats);

    store.dispatch(setChats(chats));
    // Mostrar la lista de chats pendientes en la interfaz
});

// Recibe notificación de un nuevo chat
connection.on("NewChatRequest", (chat) => {
    console.log("Nuevo chat recibido -> ID: " + chat.id);
    // Agrega el nuevo chat al estado
    store.dispatch(addChat(chat));
});

/*
//Me asigno un chat
document.querySelector('.content').addEventListener("click", async function (event) {
    if (event.target && event.target.classList.contains('chat')) {
        const selectedChatId = Number.parseInt(event.target.id);
        try {
            await connection.invoke("AssignOperatorToChat", selectedChatId);
            OperatorContext.selectedChatId = selectedChatId;
        } catch (err) {
            console.error("Error asignar operador:", err);
        }
    }

});

// Recibe notificación de que un chat fue asignado
connection.on("ChatAssigned", (chat) => {
    console.log(`El chat ${chat.id} ha sido asignado a otro operador.`);
    // Remover el chat de la lista de pendientes en la interfaz
});


// Escucha los mensajes desde el hub (método "ReceiveMessage")
export const ReceiveMessage = async (messageDto) => {

    console.log({ messageDto });

    const senderIsClient = messageDto.senderType == 1 ? true : false;
    const date = new Date(messageDto.timeStamp);
    const niceTimeStamp = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    messageElement.classList.add("msg", senderIsClient ? "clientMsg" : "opMsg");
    messageElement.textContent = `${niceTimeStamp} - ${senderIsClient ? 'User' : 'OPE'} says:  ${messageDto.content}`;
    document.getElementById("messages").appendChild(messageElement);

}


connection.on("ReceiveMessage", (messageDto) => {
    const messageElement = document.createElement("div");
    console.log({ messageDto });
    const senderIsClient = messageDto.senderType == 1 ? true : false;
    const date = new Date(messageDto.timeStamp);
    const niceTimeStamp = `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
    messageElement.classList.add("msg", senderIsClient ? "clientMsg" : "opMsg");
    messageElement.textContent = `${niceTimeStamp} - ${senderIsClient ? 'User' : 'OPE'} says:  ${messageDto.content}`;
    document.getElementById("messages").appendChild(messageElement);
});
*/
// Método para enviar un mensaje al hub
export const sendMessageToChat = async (chatId, userId, message) => {
    try {
        await connection.invoke("SendMessageToChat", chatId, userId, message);
        console.log(`Mensaje enviado existosamente // Chat: ${chatId}, Usuario:${userId}, Mensaje:${message}`);
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
    }
};
