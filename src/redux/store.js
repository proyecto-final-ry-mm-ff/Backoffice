
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';

import userReducer from './features/user/userSlice';
import chatReducer from './features/chat/chatSlice';
import flowReducer from './features/flows/flowSlice';

// Configuración de persistencia
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['chatStore', 'userStore'] 
}

// Combinar reducers
const rootReducer = combineReducers({ 
    chatStore: chatReducer,
    userStore: userReducer,
    flowStore: flowReducer,
})

// Reducer persistido
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Necesario para redux-persist
        }),
});

// Persistor
export const persistor = persistStore(store);