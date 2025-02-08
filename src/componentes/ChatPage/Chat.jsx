import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, Typography, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { colorsList } from "../../theme";
import {
    sendMessageToChat,
} from "../../Services/signalRService.js";
import { useSelector } from "react-redux";
import { Constants } from "../../Services/helper/constants.js";
import { useToast } from "../../context/ToastContext"; // Importamos el hook

const Chat = ({ chat }) => {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);
    const { showToast } = useToast(); // Usamos el toast global

    // Usa el chat directamente desde props
    const [messages, setMessages] = useState(chat?.messages || []);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const chatStore = useSelector((state) => state.chatStore);

    let selectedChat = chatStore?.allChats.find((c) => c?.id === chat?.id);
    // Determinar si el chat está asignado al operador
    const isAssigned = chatStore.myChats.some((c) => c.id === chat?.id);

    if (!selectedChat) {
        selectedChat = chatStore?.myChats.find((c) => c?.id === chat?.id);
    }

    // Desplaza automáticamente hacia el último mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
    }, [chatStore]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que se realice un salto de línea
            handleSendMessage();
        }
    };

    // Envía mensajes desde el usuario
    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const senderTypeId = Constants.SENDER_TYPE_OPERATOR; // Operador

                // Envía el mensaje al servidor
                await sendMessageToChat(selectedChat.id, senderTypeId, newMessage);

                setNewMessage("");
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
                showToast(
                    "Error al enviar mensaje. Por favor contactese con soporte",
                    "error",
                );
            }
        }
    };

    if (!chat) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: colors.background[300],
                    overflow: 'hidden',
                }}
            >
                {/* Encabezado */}
                <Box sx={{ padding: 2, height: '64px', backgroundColor: colors.background[200] }}>
                    <Typography variant="h3" >
                        CHAT con {selectedChat?.customer?.name} - Desde {selectedChat?.client?.name} [{selectedChat?.id}]
                    </Typography>
                </Box>
                {/* Canvas de mensajes */}
                <Box
                    className="chat-box"
                    sx={{
                        flex: 1,
                        maxHeight: '100%',
                        overflowY: 'auto',
                        padding: '15px 50px',
                        backgroundColor: colors.background[600],
                    }}
                >
                    {selectedChat?.messages?.map((msg, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: msg.senderType === 2 ? 'flex-end' : 'flex-start',
                                marginBottom: '8px',
                                wordWrap: 'break-word', // Habilita el salto de línea automático
                                whiteSpace: 'pre-wrap', // Permite mantener espacios y saltos de línea
                            }}
                        >
                            <Box
                                sx={{
                                    maxWidth: '70%',
                                    padding: '10px 16px',
                                    borderRadius: '10px',
                                    backgroundColor: msg.senderType === 2 ? colors.accentBlue[500] : colors.accentGreen[500],
                                    color: colors.textPrimary[500],
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                    wordWrap: 'break-word', // Fuerza el salto de línea en palabras largas
                                    whiteSpace: 'pre-wrap', // Respeta los saltos de línea y espacios
                                }}
                            >
                                <Typography variant="body2">{msg.content}</Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ color: colors.textSecondary[500], fontSize: '10px', display: 'block', textAlign: 'right' }}
                                >
                                    {new Date(msg.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Sección para escribir un mensaje */}
                <Box padding='10px' display="flex" alignItems="center" height="80px">
                    <TextField
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        variant="outlined"
                        disabled={!isAssigned} // Campo deshabilitado si no está asignado
                        sx={{
                            backgroundColor: colors.background[200], // Fondo del TextField
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra para profundidad
                            input: {
                                color: colors.textPlaceholder[500], // Color del texto

                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'transparent',
                                },
                                '&:hover fieldset': {
                                    border: 'transparent',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'transparent',
                                },
                            },
                        }}
                    />
                    <Button
                        onClick={handleSendMessage}
                        sx={{
                            marginLeft: 1,
                            borderRadius: 100,
                            backgroundColor: 'transparent',
                            '&:hover': { backgroundColor: 'transparent', color: colors.accentBlue[500] },

                        }}
                    >
                        <SendIcon sx={{ fontSize: '30px' }} />
                    </Button>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: colors.background[300],
                overflow: "hidden",
            }}
        >
            {/* Encabezado */}
            <Box
                sx={{
                    padding: 2,
                    height: "64px",
                    backgroundColor: colors.background[200],
                }}
            >
                <Typography variant="h3">
                    CHAT {selectedChat?.id} con {selectedChat?.customer?.name} - Desde{" "}
                    {selectedChat?.client?.name}
                </Typography>
            </Box>
            {/* Canvas de mensajes */}
            <Box
                className="chat-box"
                sx={{
                    flex: 1,
                    maxHeight: "100%",
                    overflowY: "auto",
                    padding: "15px 50px",
                    backgroundColor: colors.background[600],
                }}
            >
                {selectedChat?.messages?.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: "flex",
                            justifyContent: msg.senderType === 2 ? "flex-end" : "flex-start",
                            marginBottom: "8px",
                            wordWrap: "break-word", // Habilita el salto de línea automático
                            whiteSpace: "pre-wrap", // Permite mantener espacios y saltos de línea
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: "70%",
                                padding: "10px 16px",
                                borderRadius: "10px",
                                backgroundColor:
                                    msg.senderType === 2
                                        ? colors.accentBlue[500]
                                        : colors.accentGreen[500],
                                color: colors.textPrimary[500],
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                wordWrap: "break-word", // Fuerza el salto de línea en palabras largas
                                whiteSpace: "pre-wrap", // Respeta los saltos de línea y espacios
                            }}
                        >
                            <Typography variant="body2">{msg.content}</Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: colors.textSecondary[500],
                                    fontSize: "10px",
                                    display: "block",
                                    textAlign: "right",
                                }}
                            >
                                {new Date(msg.timeStamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Sección para escribir un mensaje */}
            <Box padding="10px" display="flex" alignItems="center" height="80px">
                <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe un mensaje..."
                    variant="outlined"
                    disabled={!isAssigned} // Campo deshabilitado si no está asignado
                    sx={{
                        backgroundColor: colors.background[200], // Fondo del TextField
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Sombra para profundidad
                        input: {
                            color: colors.textPlaceholder[500], // Color del texto
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                border: "transparent",
                            },
                            "&:hover fieldset": {
                                border: "transparent",
                            },
                            "&.Mui-focused fieldset": {
                                border: "transparent",
                            },
                        },
                    }}
                />
                <Button
                    onClick={handleSendMessage}
                    sx={{
                        marginLeft: 1,
                        borderRadius: 100,
                        backgroundColor: "transparent",
                        "&:hover": {
                            backgroundColor: "transparent",
                            color: colors.accentBlue[500],
                        },
                    }}
                >
                    <SendIcon sx={{ fontSize: "30px" }} />
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
