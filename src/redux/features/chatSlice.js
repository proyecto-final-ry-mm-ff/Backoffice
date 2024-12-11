import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
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
            return {...state, chatList: newChatList}
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
    }
});

export const { addChat, setChats, assignChat, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;