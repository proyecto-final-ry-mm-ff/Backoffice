import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chats',
    initialState: {
        chats: [],
    },
    reducers: {
        addChat: (state, action) => {
            state.chats.push(action.payload); // Agrega el nuevo chat
        },
        setChats: (state, action) => {
            state.chats = action.payload; // Reemplaza la lista de chats
        }
    }
});

export const { addChat, setChats } = chatSlice.actions;
export default chatSlice.reducer;