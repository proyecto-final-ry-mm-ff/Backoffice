
//Store: Es el "almacén" central donde se guarda el estado global de la aplicación.

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/slice';

import chatReducer from './features/chatSlice';
import flowReducer from './features/flowSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,

        chatStore: chatReducer,
        flowStore: flowReducer,
    }
});