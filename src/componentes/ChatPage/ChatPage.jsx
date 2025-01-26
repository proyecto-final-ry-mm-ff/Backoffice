import React, { useState } from "react";
import Chat from "./Chat";
import ChatList from "./ChatList";
import { Box } from "@mui/material";
import { getChat } from "../../Services/chatService";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "../../redux/features/chat/chatSlice";

const ChatPage = () => {
  const [thisSelectedChat, setThisSelectedChat] = useState(); // Estado para el chat seleccionado
  const dispatch = useDispatch();


  const handleSelectedChat = async (chat) => {
    const chatWithAllMessages = await getChat(chat.id);
    if (chatWithAllMessages) {
      setThisSelectedChat(chatWithAllMessages)
      dispatch(setSelectedChat(chatWithAllMessages));
    }
  };

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
        <ChatList onChatSelect={handleSelectedChat} />
      </Box>

      {/* Chat principal */}
      <Box
        sx={{
          flex: "1", // Ocupa el espacio restante
          overflowY: "hidden",
        }}
      >
        <Chat chat={thisSelectedChat} />
      </Box>
    </Box>
  );
};

export default ChatPage;
