// src/redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./features/user/userSlice";
import chatReducer from "./features/chat/chatSlice";
import flowReducer from "./features/flows/flowSlice";
import clientsReducer from "./features/clients/clientsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chatStore", "userStore"],
};

const rootReducer = combineReducers({
  chatStore: chatReducer,
  userStore: userReducer,
  flowStore: flowReducer,
  clientsStore: clientsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
