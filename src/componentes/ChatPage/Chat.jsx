import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { colorsList } from "../../theme";
import { sendMessageToChat } from '../../Services/signalRService.js';

const Chat = ({ chatId }) => {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        if (chatId) {
            setMessages([
                { id: 1, text: "¡Hola! ¿Cómo estás?", isSentByMe: false },
                { id: 2, text: "¡Bien, gracias! ¿Y tú?", isSentByMe: true },
            ]);
        }
    }, [chatId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            setMessages((prevMessages) => [...prevMessages, { text: newMessage, isSentByMe: true }]);

            const userId = 2;
            try {
                await sendMessageToChat(chatId, userId, newMessage);
            } catch (err) {
                console.error("Error al enviar mensaje:", err);
            }

            setNewMessage(''); // Limpia la caja de entrada
        }
    };

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
            <Typography
                variant="h3"
                sx={{
                    padding: '16px',
                    color: colors.textPrimary[500],
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                }}
            >

                Chat {chatId}
            </Typography>

            {/* Canvas de mensajes */}
            <Box
                className="chat-box"
                sx={{
                    flex: 1,
                    maxHeight: '100%',
                    overflowY: 'auto',
                    padding: '15px 50px',
                    backgroundColor: colors.background[500],
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.isSentByMe ? 'flex-end' : 'flex-start',
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
                                backgroundColor: msg.isSentByMe ? colors.accentBlue[500] : colors.accentGreen[500],
                                color: colors.textPrimary[500],
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                wordWrap: 'break-word', // Fuerza el salto de línea en palabras largas
                                whiteSpace: 'pre-wrap', // Respeta los saltos de línea y espacios
                            }}
                        >
                            <Typography variant="body2">{msg.text}</Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: colors.textSecondary[500], fontSize: '10px', display: 'block', textAlign: 'right' }}
                            >
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Sección para escribir un mensaje */}
            <Box padding='10px' display="flex" alignItems="center">
                <TextField
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    sx={{

                        backgroundColor: colors.background[100],
                        borderRadius: '8px',
                        input: { color: colors.textPrimary[500] },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSendMessage}
                    sx={{
                        marginLeft: 1,
                        borderRadius: '5px',
                        minWidth: '48px',
                        height: '48px',
                        backgroundColor: colors.accentBlue[400],
                        '&:hover': { backgroundColor: colors.accentBlue[500] },
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
