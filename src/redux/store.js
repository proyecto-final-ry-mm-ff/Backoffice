
//Store: Es el "almacén" central donde se guarda el estado global de la aplicación.

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/slice';
<<<<<<< Updated upstream
=======
import chatReducer from './features/chatSlice';
import flowReducer from './features/flowSlice';
>>>>>>> Stashed changes

export const store = configureStore({
    reducer: {
        user: userReducer,
<<<<<<< Updated upstream

=======
        chatStore: chatReducer,
        flowStore: flowReducer,
>>>>>>> Stashed changes
    }
});