mport React, { useState } from "react";
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
import { colorsList } from "../../theme";
import { assignChat } from "../../redux/features/chat/chatSlice";
import ArchiveIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import UnarchiveIcon from "@mui/icons-material/ArrowBackIosOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { assignOperatorToChat } from "../../Services/signalRService";
import { saveChat } from "../../Services/chatService";
import { GetBearerToken } from "../../Services/helperService";

export default function ChatList({ onChatSelect }) {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  const dispatch = useDispatch();

  const userStore = useSelector((state) => state.userStore);

  const chats = useSelector((state) => state.chatStore); // ChatsList filtrados según la tab seleccionada
  const [selectedTab, setSelectedTab] = useState(0); // Controla el tab activo
  const chatsList = selectedTab === 0 ? chats.allChats : chats.myChats; // All = 0  MY = 1

  const [searchTerm, setSearchTerm] = useState(""); // Estado para el campo de búsqueda

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle de tabs
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Handle para definir el chat seleccionado
  const handleChatClick = (chat) => {
    onChatSelect(chat);
  };

  /*const handleAssignChat = async () => {
        store.dispatch(assignChat({ userId: userStore.id, chat: thisChat }));
        await assignOperatorToChat(thisChat.id);
    }*/

  const handleAssignChat = async (chatId) => {
    dispatch(assignChat({ userStoreId: userStore.id, chatId }));
    await assignOperatorToChat(chatId);
  };

  const handleEndChat = async (chatId) => {
    try {
      const token = userStore.token;
      const chat = chats.myChats.find((c) => c.id === chatId);

      if (!chat) {
        console.error("Chat no encontrado en mi lista.");
        return;
      }

      const success = await saveChat(token, chat);
      if (success) {
        console.log("Chat guardado y finalizado correctamente.");
      } else {
        console.error("Error al guardar y finalizar el chat.");
      }
    } catch (err) {
      console.error("Error al finalizar el chat:", err);
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
      {/* Encabezado */}
      <Box
        sx={{
          marginBottom: "8px",
          paddingBottom: "8px",
        }}
      >
        <Typography variant="h3">CHATS</Typography>
      </Box>

      {/*Input búsqueda */}

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

      {/* Tabs para alternar entre "All" y "My" */}
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

      {/* Lista de chatslist */}
      <Box
        sx={{
          alignItems: "center",
          overflowY: "auto",
          marginTop: "10px",
        }}
      >
        {chatsList?.length > 0 ? (
          chatsList.map((chat) => (
            <Box
              key={chat.id}
              onClick={() => handleChatClick(chat)}
              sx={{
                display: "flex",
                overflow: "hidden",
                mb: "10px",
                height: "50px",
                backgroundColor: colors.background[200],
                borderRadius: "8px",
                borderBottom: `1px solid ${colors.border[900]}`,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: colors.background[300],
                  ".delete-icon": {
                    // Selecciona el ícono de basura
                    transform: "translateX(0)", // Lo mueve a su posición original
                    opacity: 1, // Asegura que sea visible
                  },
                  ".chat-text": {
                    // Selecciona el texto
                    transform: "translateX(10px)", // Mueve el texto hacia la derecha
                    transition: "transform 0.3s ease", // Anima el deslizamiento
                  },
                },
              }}
            >
              {/* Botón de terminar chat */}
              <Button
                className="delete-icon"
                sx={{
                  display: "flex",
                  position: "relative", // Permite que el botón esté fuera del flujo
                  left: "-0px", // Oculta el ícono fuera del contenedor
                  borderTopLeftRadius: "8px !important",
                  borderBottomLeftRadius: "8px !important",
                  opacity: 0, // Oculto por defecto
                  transform: "translateX(-10px)", // Posición inicial para el deslizamiento
                  transition: "all 0.3s ease", // Animación suave al aparecer

                  minWidth: "unset",
                  height: "50px",
                  width: "35px",

                  justifyContent: "center", // Centra el contenido horizontalmente
                  alignItems: "center", // Centra el contenido verticalmente

                  paddingBottom: "10px",

                  borderRadius: "0px",
                  "&:hover": {
                    backgroundColor: colors.accentRed[400],
                  },
                }}
                onClick={() => handleEndChat(chat.id)}
              >
                {selectedTab === 0 ? (
                  <DeleteOutlineOutlinedIcon />
                ) : (
                  <DeleteOutlineOutlinedIcon />
                )}
              </Button>
              <Typography
                className="chat-text"
                sx={{
                  padding: "10px 0px",
                  fontSize: "18px",
                  transform: "translateX(-10px)", // Posición inicial
                  transition: "transform 0.3s ease", // Transición suave
                }}
              >
              {`${chat?.client?.name} - ${chat?.customer?.name}`}
              </Typography>
              <Button
                onClick={() => handleAssignChat(chat?.id)}
                sx={{
                  minWidth: "unset",
                  display: "flex",
                  width: "40px",
                  padding: "0px",
                  marginLeft: "auto",
                  borderRadius: "0px",
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
    </Box>
  );
}