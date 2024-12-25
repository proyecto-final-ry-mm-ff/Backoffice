import { store } from '../redux/store';
import { addChat, addMessageToChat, setChats } from '../redux/features/chat/chatSlice';
import * as signalR from '@microsoft/signalr';
import { assignChat } from '../redux/features/chat/chatSlice';
const wssUrl = "http://localhost:5056/chat-hub";

// Conexión al hub de SignalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl(wssUrl)
    .build();

// Eventos del Hub
const setupSignalREvents = () => {
    connection.on("PendingChats", (chats) => {
        const uniqueChats = Array.from(new Map(chats.map(chat => [chat.id, chat])).values());
        store.dispatch(setChats(uniqueChats));
    });
    /* 
        connection.on("AssignedChats", (chats) => {
            console.log("Chats asignados:", chats);
            store.dispatch(setAssignedChats(chats));
        });
     */
    connection.on("NewChatRequest", (chat) => {
        console.log("NewChatRequest", { chat });
        store.dispatch(addChat(chat));
    });

    connection.on("ReceiveMessage", (messageDto) => {
        console.log("ReceiveMessage", { messageDto });
        store.dispatch(addMessageToChat(messageDto));
    });

    connection.on("ChatAssigned", (chat, pendingChats) => {
        console.log(`Se ha asignado el chat ${chat.id} Nuevos chats pendientes: `, pendingChats);
        store.dispatch(setChats(pendingChats));
    });

    connection.on("OperatorJoined", (chat) => {
        console.log(`Te asignaste el chat ${chat.id}`);
    });

    connection.on("ClientDisconnected", (pendingChat) => {
        console.log(`Se te desconectó el cliente ${pendingChat?.id}`);
    });

    connection.on("ClientDisconnectedFromPending", (pendingChat) => {
        console.log(`Un cliente pendiente se desconectó: ${pendingChat?.id}`);
    });
};

// Métodos para manejar la conexión
export const connectToHub = async () => {
    try {
        setupSignalREvents(); // Configurar eventos
        await connection.start();
        await connection.invoke("OperatorConnect");
        console.log("Conectado al Hub de SignalR como operador");
    } catch (err) {
        console.error("Error al conectar con el Hub de SignalR", err);
        // Reintentar conexión después de un tiempo
        setTimeout(connectToHub, 5000);
    }
};

export const disconnectFromHub = async () => {
    try {
        if (connection.state === signalR.HubConnectionState.Connected) {
            await connection.invoke("OperatorDisconnect");
            console.log('OperatorDisconnect se invocó correctamente.');
        }
        await connection.stop();
        console.log('Conexión detenida correctamente.');
    } catch (err) {
        console.error("Error al desconectar del Hub:", err);
    }
};

// Métodos adicionales del Hub
export const assignOperatorToChat = async (selectedChatId) => {
    try {
        // Llamar al backend y esperar confirmación
        const result = await connection.invoke("AssignOperatorToChat", selectedChatId);

        if (result.success) {
            // Despachar acción para actualizar Redux
            store.dispatch(assignChat({ chatId: selectedChatId }));
            console.log(`Chat ${selectedChatId} asignado exitosamente.`);
        } else {
            console.error(`Error desde el backend: ${result.message}`);
        }
    } catch (err) {
        console.error("Error al asignar operador:", err);
        alert("No se pudo asignar el chat. Inténtalo nuevamente.");
    }
};



export const sendMessageToChat = async (chatId, senderTypeId, message) => {
    try {
        await connection.invoke("SendMessageToChat", chatId, senderTypeId, message);
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
    }
};

export default connection;
