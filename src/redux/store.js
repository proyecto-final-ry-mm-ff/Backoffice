
//Store: Es el "almacén" central donde se guarda el estado global de la aplicación.

import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './features/slice';

export const store = configureStore({
    reducer: {
        user: userReducer,

    }
});