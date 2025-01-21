import React, { useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { Box } from "@mui/material";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(); // Estado para el chat seleccionado

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflow: "hidden",
        height: "100%",
      }}
    >
      {/* Lista de chats izquierda */}
      <Box
        sx={{
          flex: "0 0 22%",
          overflowY: "hidden",
        }}
      >
        <ChatList onChatSelect={setSelectedChat} />
      </Box>

      {/* Chat principal */}
      <Box
        sx={{
          flex: "1", // Ocupa el espacio restante
          overflowY: "hidden",
        }}
      >
        <Chat chat={selectedChat} />
      </Box>
    </Box>
  );
};

export default ChatPage;
