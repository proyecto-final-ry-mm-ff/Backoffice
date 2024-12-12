
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';

import chatReducer from './features/chat/chatSlice';
import flowReducer from './features/flows/flowSlice';

export const store = configureStore({
    reducer: {
        chatStore: chatReducer,
        userStore: userReducer,
        flowStore: flowReducer,
    }
});