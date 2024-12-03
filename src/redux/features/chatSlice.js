import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chatList: []
    },
    reducers: {
        addChat: (state, action) => {
            console.log('ACA TU PAYLOAD',action.payload)
            state.chatList.push(action.payload); // Agrega un nuevo chat
        },
        setChats: (state, action) => {
            state.chatList = action.payload; // Reemplaza la lista de chats
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
        },
    }
});

export const { addChat, setChats, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;