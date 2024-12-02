import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState:
    {
        token: null,
        refreshToken: null,
        logged: false,
        assignedChats: [],
        // user: null,
        // id: null,
        // status: 'idle',
        // error: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.logged = true;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.logged = false;
            // state.user = null;
            // state.id = null;
        },
        assignChat: (state, action) => {
            state.assignedChats.push(action.chat); // Agrega un nuevo chat
        },
        // setChats: (state, action) => {
        //     state.chatList = action.payload; // Reemplaza la lista de chats
        // },
        // addMessageToChat: (state, action) => {
        //     // const { connectionId } = action.payload; // Desestructura el ID del chat y el mensaje
        //     // const chat = state.chatList.find((c) => c.id === connectionId); // Busca el chat por ID
        //     const { chatId } = action.payload; // Desestructura el ID del chat y el mensaje
        //     const chat = state.chatList.find((c) => c.id === chatId); // Busca el chat por ID
        //     if (chat) {
        //         chat.messages = chat.messages || []; // Asegúrate de que tenga un array de mensajes
        //         chat.messages.push(action.payload); // Agrega el mensaje al chat correspondiente
        //     }
        // },
    }
});

export const { login, logout, assignChat } = userSlice.actions;
export default userSlice.reducer;