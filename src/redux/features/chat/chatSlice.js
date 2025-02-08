import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allChats: [],
  myChats: [],
  selectedChat: null,
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.allChats = action.payload;
    },
    addChat: (state, action) => {
      const theChat = action.payload;

      // Verificar si ya está en myChats para evitar duplicados
      const existsInMyChats = state.myChats.some((chat) => chat.id === theChat.id);
      if (!existsInMyChats) {
        // Buscar el chat en allChats
        const targetChat = state.allChats.find((chat) => chat.id === theChat.id);
        //Recién si tampoco está en el listado general, lo agrego
        if (!targetChat) {
          state.allChats = [...state.allChats, theChat];
        }
      }

      if (existsInMyChats) {
        const myChatIndex = state.myChats.findIndex((chat) => chat.id === theChat.id);
        if (myChatIndex !== -1) {
          state.myChats[myChatIndex] = theChat;
        }
      } else {
        //Recién si tampoco está en el listado general, lo agrego
        // Reemplazar el chat en allChats si existe
        const allChatIndex = state.allChats.findIndex((chat) => chat.id === theChat.id);
        if (allChatIndex !== -1) {
          state.allChats[allChatIndex] = theChat;
        }
      }

    },
    removeChat: (state, action) => {
      const chatId = action.payload; // `pendingChat.id` del evento
      state.allChats = state.allChats.filter((chat) => chat.id !== chatId);
      state.myChats = state.myChats.filter((chat) => chat.id !== chatId);

      if (state.selectedChat && state.selectedChat?.id === chatId) {
        state.selectedChat = null;
      }
    },
    addMessageToChat: (state, action) => {
      const { chatId, ...message } = action.payload;
      const chat = state.allChats.find((c) => c.id === chatId);
      if (chat) {
        chat.messages = [...(chat.messages || []), message]; // Asegura inmutabilidad
      }

      const assignedChat = state.myChats.find((c) => c.id === chatId); // Busca el chat por ID
      if (assignedChat) {
        assignedChat.messages = [...(assignedChat.messages || []), message]; // Asegura inmutabilidad
      }
    },
    // Asignar
    assignChat: (state, action) => {
      const { chatId } = action.payload;

      // Verificar si ya está en myChats para evitar duplicados
      const existsInMyChats = state.myChats.some((chat) => chat.id === chatId);
      if (!existsInMyChats) {
        // Buscar el chat en allChats
        const theChat = state.allChats.find((chat) => chat.id === chatId);
        if (theChat) {
          // Mover el chat a myChats
          state.myChats = [...state.myChats, theChat];
          // Eliminar el chat de allChats
          state.allChats = state.allChats.filter((chat) => chat.id !== chatId);
        }
      }
    },
    // Desasignar
    unassignChat(state, action) {
      const chatId = action.payload;
      const chatIndex = state.myChats.findIndex((chat) => chat.id === chatId);
      if (chatIndex > -1) {
        const [chat] = state.myChats.splice(chatIndex, 1);
        state.allChats.push(chat);
      }
    },
    // Seleccionar
    setSelectedChat: (state, action) => {
      const updatedChat = action.payload;
      state.selectedChat = updatedChat;

      // Reemplazar el chat en myChats si existe
      const myChatIndex = state.myChats.findIndex((chat) => chat.id === updatedChat.id);
      if (myChatIndex !== -1) {
        state.myChats[myChatIndex] = updatedChat;
      }

      // Reemplazar el chat en allChats si existe
      const allChatIndex = state.allChats.findIndex((chat) => chat.id === updatedChat.id);
      if (allChatIndex !== -1) {
        state.allChats[allChatIndex] = updatedChat;
      }
    },
    // Deseleccionar
    clearSelectedChat: (state) => {
      state.selectedChat = null;
    },
    clearMyChats: (state) => {
      state.myChats = [];
    },
  },
});

export const {
  setChats,
  addChat,
  removeChat,
  addMessageToChat,
  assignChat,
  unassignChat,
  setSelectedChat,
  clearSelectedChat,
  clearMyChats,
} = chatSlice.actions;

export default chatSlice.reducer;
