
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/slice';
import chatReducer from './features/chatSlice';
import newUserReducer from './features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chatStore: chatReducer,
        userStore: newUserReducer
    }
});