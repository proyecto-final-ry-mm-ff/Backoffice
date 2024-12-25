
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allChats: [], // Lista de todos los flujos
    myChats: [],
    selectedChat: null,
};

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action) => {
            console.log('se setean chats');
            state.allChats = action.payload;
        },
        addChat: (state, action) => {
            console.log('se agrega chat');
            state.allChats.push(action.payload);
        },
        addMessageToChat: (state, action) => {
            console.log('se manda un mensaje al chat');
            const { chatId, ...message } = action.payload;
            const chat = state.allChats.find((c) => c.id === chatId);
            if (chat) {
                chat.messages = [...(chat.messages || []), message]; // Asegura inmutabilidad
            }

            const assignedChat = state.myChats.find((c) => c.id === chatId); // Busca el chat por ID
            if (assignedChat) {
                assignedChat.messages = [...(assignedChat.messages || []), message]; // Asegura inmutabilidad
            }
        },
        // Asignar
        assignChat: (state, action) => {
            console.log('se asigna un chat');
            const { chatId } = action.payload;
        
            // Verificar si ya está en myChats para evitar duplicados
            const existsInMyChats = state.myChats.some(chat => chat.id === chatId);
            if (!existsInMyChats) {
                // Buscar el chat en allChats
                const theChat = state.allChats.find(chat => chat.id === chatId);
                if (theChat) {
                    // Mover el chat a myChats
                    state.myChats = [...state.myChats, theChat];
                    // Eliminar el chat de allChats
                    state.allChats = state.allChats.filter(chat => chat.id !== chatId);
                }
            }
        },
        
        // Desasignar
        unassignChat(state, action) {
            console.log('se desasigna un chat');
            const chatId = action.payload;
            const chatIndex = state.myChats.findIndex(chat => chat.id === chatId);
            if (chatIndex > -1) {
                const [chat] = state.myChats.splice(chatIndex, 1);
                state.allChats.push(chat);
            }
        },
        // Seleccionar
        setSelectedChat: (state, action) => {
            console.log('se selecciona un chat');
            state.selectedChat = action.payload;
        },
        // Deseleccionar
        clearSelectedChat: (state) => {
            console.log('se deselecciona un chat')
            state.selectedChat = null;
        },
    },
});

export const { setChats, addChat, addMessageToChat, assignChat, unassignChat, setSelectedChat, clearSelectedChat, } = chatSlice.actions;
export default chatSlice.reducer;

/*const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chatList: [],
        assignedChats: [],
    },
    reducers: {
        addChat: (state, action) => {
            const chat = { ...action.payload, assigned: false };
            state.chatList.push(chat); // Agrega un nuevo chat
        },
        setChats: (state, action) => {
            const newChatList = Array.from(action.payload).map((chat) => {
                return { ...chat, assigned: false };
            });
            //  state.chatList = newChatList; // Reemplaza la lista de chats
            return { ...state, chatList: newChatList }
        },
        assignChat: (state, action) => {
            // const chatId = action.payload.chat.id;

            // // Busca el chat y crea una copia para modificarlo
            // const chatIndex = state.chatList.findIndex((c) => c.id === chatId);
            // if (chatIndex === -1) return; // Si no encuentra el chat, no hace nada

            // const assignedChat = { 
            //     ...state.chatList[chatIndex], 
            //     assigned: true // Modifica el atributo
            // };

            // // Actualiza la lista de chats con la copia modificada
            // state.chatList[chatIndex] = assignedChat;

            // Agrega el chat modificado a assignedChats
            const chat = action.payload.chat;
            const userId = action.payload.userId;
            state.assignedChats.push({ ...chat, userId });

            // Redux Toolkit se encarga de gestionar la inmutabilidad gracias a Immer
        },
        addMessageToChat: (state, action) => {
            // const { connectionId } = action.payload; // Desestructura el ID del chat y el mensaje
            // const chat = state.chatList.find((c) => c.id === connectionId); // Busca el chat por ID
            const { chatId } = action.payload; // Desestructura el ID del chat y el mensaje

            const chat = state.chatList.find((c) => c.id === chatId); // Busca el chat por ID
            if (chat) {
                chat.messages = chat.messages || []; // Asegúrate de que tenga un array de mensajes
                chat.messages.push(action.payload); // Agrega el mensaje al chat correspondiente
            }

            const assignedChat = state.assignedChats.find((c) => c.id === chatId); // Busca el chat por ID
            if (assignedChat) {
                assignedChat.messages = assignedChat.messages || []; // Asegúrate de que tenga un array de mensajes
                assignedChat.messages.push(action.payload); // Agrega el mensaje al chat correspondiente
            }
        },
    },
});

export const { assignChat } = chatSlice.actions;
export default chatSlice.reducer;*/