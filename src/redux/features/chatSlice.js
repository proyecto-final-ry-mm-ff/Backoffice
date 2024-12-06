import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chatList: []
    },
    reducers: {
        setChats: (state, action) => {
            state.chatList = action.payload; // Reemplaza la lista de chats
        },
        addChat: (state, action) => {
            state.chatList.push(action.payload); // Agrega un nuevo chat
        },
        addMessageToChat: (state, action) => {
            const { connectionId } = action.payload; // Desestructura el ID del chat y el mensaje
            const chat = state.chatList.find((c) => c.id === connectionId); // Busca el chat por ID
            if (chat) {
                chat.messages = chat.messages || []; // Asegúrate de que tenga un array de mensajes
                chat.messages.push(action.payload); // Agrega el mensaje al chat correspondiente
            }
        },
    }
});

export const { addChat, setChats, addMessageToChat } = chatSlice.actions;
export default chatSlice.reducer;