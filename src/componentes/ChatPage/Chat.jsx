import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { colorsList } from "../../theme";
import { saveChat } from '../../Services/services';
import { sendMessageToChat, assignOperatorToChat } from '../../Services/signalRService.js';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { assignChat } from '../../redux/features/chat/chatSlice.js';

const Chat = ({ chatId }) => {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    const chatStore = useSelector((state) => state.chatStore);
    const chats = chatStore.chatList;
    let thisChat = chats?.find(c => c.id === chatId) || null;
    let chatIsAssigned = false;

    if (!thisChat) {
        thisChat = chatStore.assignedChats?.find(c => c.id === chatId) || null;
        chatIsAssigned = true;
    }

    const userStore = useSelector((state) => state.userStore);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    //Para asignar operador al chat
    // useEffect(() => {
    //     handleAssignOperatorToChat(chatId);
    // }, [chatId])

    // // Cargar los mensajes
    // useEffect(() => {
    //     if (chatId) {
    //         //TODO / Cargar mensajes
    //         setMessages([
    //             { id: 1, text: "¡Hola! ¿Cómo estás?", isSentByMe: false },
    //             { id: 2, text: "¡Bien, gracias! ¿Y tú?", isSentByMe: true },
    //         ]);
    //     }
    // }, [chatId]); // Atento a cada vez que el chatId cambie


    // const handleAssignOperatorToChat = async (chatId) => {
    //     await assignOperatorToChat(chatId);
    //     store.dispatch(assignChat(thisChat));
    //     const remainingChats = chats.filter(chat=>chat.id != thisChat.id);
    //     console.log('RemainignCHats', remainingChats);
    //     store.dispatch(setChats(remainingChats))
    // }

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            try {
                const senderTypeId = 2; // Operador
                await sendMessageToChat(chatId, senderTypeId, newMessage);
                setNewMessage('');
            } catch (error) {
                console.error("Error al enviar mensaje:", error);
            }
        }
    };

    const handleEndChat = async () => {
        try {
            // Pegarle al endChat de signalRF
            const token = userStore.token;
            await saveChat(token, thisChat);
        } catch (err) {
            console.error("Error al enviar mensaje:", err);
        }
    }

    const handleAssignChat = async () => {
        //store.dispatch(assignChat({ userId: userStore.id, chat: thisChat }));
        //await assignOperatorToChat(thisChat.id);
    }

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
                    CHAT {chatId}
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
                {thisChat?.messages?.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.senderTypeId === 2 ? 'flex-end' : 'flex-start',
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
                                backgroundColor: msg.senderTypeId === 2 ? colors.accentBlue[500] : colors.accentGreen[500],
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
};

export default Chat;
