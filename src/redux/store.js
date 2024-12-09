
//Store: Es el "almacén" central donde se guarda el estado global de la aplicación.

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/user/userSlice';

import chatReducer from './features/chat/chatSlice';
import flowReducer from './features/flows/flowSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        chatStore: chatReducer,
        flowStore: flowReducer,
    }
});