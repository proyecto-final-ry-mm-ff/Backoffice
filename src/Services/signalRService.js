import { store } from '../redux/store'
import { addChat, addMessageToChat, setChats } from '../redux/features/chatSlice';

import * as signalR from '@microsoft/signalr'

const wssUrl = "http://localhost:5056/chat-hub";


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



connection.on("PendingChats", (chats) => {

    console.log("Chats pendientes:", chats);

    store.dispatch(setChats(chats));
});

connection.on("NewChatRequest", (chat) => {
    console.log("Nuevo chat recibido -> ID: " + chat.id);
    // Agrega el nuevo chat al estado
    store.dispatch(addChat(chat));
});


connection.on("ReceiveMessage", (messageDto) => {
    //TODO: implementar
    console.log({ messageDto });
    store.dispatch(addMessageToChat(messageDto.chatId, messageDto));
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
        // OperatorContext.selectedChatId = selectedChatId;
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







// Recibe la lista de chats pendientes
// connection.on("PendingChats", (chats) => {

//     console.log("Chats pendientes:", chats);

//     store.dispatch(setChats(chats));
//     // Mostrar la lista de chats pendientes en la interfaz
// });

// Recibe notificación de un nuevo chat
// connection.on("NewChatRequest", (chat) => {
//     console.log("Nuevo chat recibido -> ID: " + chat.id);
//     // Agrega el nuevo chat al estado
//     store.dispatch(addChat(chat));
// });

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
