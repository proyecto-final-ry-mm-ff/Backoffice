import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: [],
    },
    reducers: {
        addChat: (state, action) => {
            state.chats.push(action.payload); // Agrega un nuevo chat
        },
        setChats: (state, action) => {
            state.chats = action.payload; // Reemplaza la lista de chats
        },
        addMessageToChat: (state, action) => {
            const { chatId, message } = action.payload; // Desestructura el ID del chat y el mensaje
            const chat = state.chats.find((c) => c.id === chatId); // Busca el chat por ID
            if (chat) {
                chat.messages = chat.messages || []; // Asegúrate de que tenga un array de mensajes
                chat.messages.push(message); // Agrega el mensaje al chat correspondiente
            }
        },
    }
});

export const { addChat, setChats, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;