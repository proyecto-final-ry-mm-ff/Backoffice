
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/slice';
import chatReducer from './features/chatSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chatStore: chatReducer
    }
});