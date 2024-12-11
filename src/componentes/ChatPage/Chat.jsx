import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ColorModeContext, codigos } from "../../theme";
import '../../estilos/chat.css';
import { sendMessageToChat } from '../../Services/signalRService.js';

const Chat = ({ chatId }) => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);

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
                backgroundColor: colors.primary[500],
                overflow: 'hidden',
                padding: '16px',
            }}
        >
            {/* Título del chat */}
            <Typography variant="h6" sx={{ color: colors.primary[900], marginBottom: '16px' }}>
                Chat {chatId}
            </Typography>

            {/* Canvas de mensajes */}
            <Box
                className="chat-box"
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    backgroundColor: colors.primary[600],
                    marginBottom: '16px',
                }}
            >
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.isSentByMe ? 'flex-end' : 'flex-start',
                            marginBottom: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '70%',
                                padding: '10px 16px',
                                borderRadius: '16px',
                                backgroundColor: msg.isSentByMe ? colors.greenAccent[400] : colors.blueAccent[400],
                                color: '#fff',
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="body2">{msg.text}</Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '10px', display: 'block', textAlign: 'right' }}
                            >
                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Box>
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            {/* Sección para escribir un mensaje */}
            <Box display="flex" alignItems="center">
                <TextField
                    variant="outlined"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    sx={{
                        backgroundColor: colors.primary[600],
                        borderRadius: '8px',
                        input: { color: colors.grey[200] },
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
                        backgroundColor: colors.greenAccent[300],
                        '&:hover': { backgroundColor: colors.greenAccent[500] },
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
