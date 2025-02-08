import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { store } from "../../redux/store";
import { colorsList } from "../../theme";
import { assignChat, removeChat } from "../../redux/features/chat/chatSlice";
import ArchiveIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import UnarchiveIcon from "@mui/icons-material/ArrowBackIosOutlined";
import CallEndOutlinedIcon from "@mui/icons-material/CallEndOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { assignOperatorToChat, endChat } from "../../Services/signalRService";
import { updateChat } from "../../Services/chatService";
import FacebookChatUpdater from "../Extras/FacebookChatUpdater";
import { Constants } from "../../Services/helper/constants";
import { useToast } from "../context/ToastContext"; // Importamos el hook


export default function ChatList({ onChatSelect }) {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  const { showToast } = useToast(); // Usamos el toast global


  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.userStore);

  const chats = useSelector((state) => state.chatStore); // ChatsList filtrados según la tab seleccionada
  const [selectedTab, setSelectedTab] = useState(0); // Controla el tab activo
  const chatsList = selectedTab === 0 ? chats.allChats : chats.myChats; // All = 0  MY = 1

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el campo de búsqueda

  useEffect(() => {
  }, [chats]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filtra los chats en base al término de búsqueda
  const filteredChatsList = chatsList.filter((chat) =>
    chat?.id.toString().includes(searchTerm.toLowerCase()) ||
    (chat?.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (chat?.customer?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleChatClick = (chat) => {
    onChatSelect(chat);
  };

  const handleAssignChat = async (chatId) => {
    dispatch(assignChat({ userStoreId: userStore.id, chatId }));
    await assignOperatorToChat(chatId);
  };

  const handleEndChat = async (chatId) => {
    try {
      const chat = chats.myChats.find((c) => c.id === chatId);

      if (!chat) {
        console.error("Chat no encontrado en mi lista.");
        return;
      }

      const endedChat = { ...chat, status: 4 };
      const success = await updateChat(endedChat);
      if (success) {
        await endChat(chat.id);
        store.dispatch(removeChat(chat.id));
        onChatSelect(false);
      } else {

        showToast(
          "Error al guardar y finalizar el chat. Por favor contactar con soporte",
          "error",
        );
      }
    } catch (err) {

      console.error("Error al finalizar el chat:", err);

      showToast(
        "Error al finalizar el chat. Por favor contactar con soporte",
        "error",
      );

    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "16px",
        backgroundColor: colors.background[500],
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <FacebookChatUpdater /> {/* Ejecuta las actualizaciones en segundo plano */}
      {/* Encabezado */}
      <Box
        sx={{
          marginBottom: "8px",
          paddingBottom: "8px",
        }}
      >
        <Typography variant="h3">CHATS</Typography>
      </Box>

      {/* Input búsqueda */}
      <TextField
        placeholder="Buscar chat..."
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          marginTop: 1,
          backgroundColor: colors.background[200],
          borderRadius: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "transparent",
            },
          },
        }}
        InputProps={{
          startAdornment: (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                pr: 2,
              }}
            >
              <SearchIcon sx={{ color: colors.textSecondary[500] }} />
            </Box>
          ),
        }}
      />

      {/* Tabs para alternar entre "Pendientes" y "Asignados" */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        sx={{
          marginTop: 1,
          marginBottom: "8px",
          "& .MuiTab-root": {
            color: colors.textSecondary[800],
            fontWeight: "bold",
          },
          "& .Mui-selected": {
            color: colors.textPrimary[500],
          },
          "& .MuiTabs-indicator": {
            backgroundColor: colors.accentBlue[500],
          },
        }}
        variant="fullWidth"
      >
        <Tab label="Pendientes" />
        <Tab label="Asignados" />
      </Tabs>

      {/* Lista de chats filtrados */}
      <Box
        sx={{
          alignItems: "center",
          overflowY: "auto",
          marginTop: "10px",
        }}
      >
        {filteredChatsList.length > 0 ? (
          filteredChatsList.map((chat) => (
            <Box
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              sx={{
                display: "flex",
                overflow: "hidden",
                mb: "10px",
                height: "50px",
                backgroundColor: (chat?.source == Constants.SOURCE_FACEBOOK) ? colors.facebookBackground[200] : colors.background[200],
                borderRadius: "8px",
                borderBottom: `1px solid ${colors.border[900]}`,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: (chat?.source == Constants.SOURCE_FACEBOOK) ? colors.facebookBackground[300] : colors.background[300],
                },
              }}
            >
              {selectedTab === 1 &&
                < Button
                  onClick={() => handleEndChat(chat.id)}
                  sx={{
                    minWidth: "unset",
                    height: "50px",
                    width: "35px",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: "10px",
                    "&:hover": {
                      backgroundColor: colors.accentRed[400],
                    },
                  }}
                >
                  <CallEndOutlinedIcon />
                </Button>
              }
              <Typography
                sx={{
                  padding: "10px 11px",
                  fontSize: "13px",
                }}
              >
                {`${chat?.client?.name || "Sin nombre"} - ${chat?.customer?.name || "Sin cliente"}`}
              </Typography>
              <Button
                onClick={() => handleAssignChat(chat?.id)}
                sx={{
                  minWidth: "unset",
                  display: "flex",
                  width: "40px",
                  padding: "0px",
                  marginLeft: "auto",
                  "&:hover": {
                    backgroundColor: colors.buttonPrimaryHover[400],
                  },
                }}
              >
                {selectedTab === 0 ? <ArchiveIcon /> : <UnarchiveIcon />}
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No hay chats disponibles</Typography>
        )}
      </Box>
    </Box >
  );
}
