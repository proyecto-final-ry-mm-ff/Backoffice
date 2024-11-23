import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, CardContent, TextField, Button, useTheme } from '@mui/material';
import { ColorModeContext, codigos } from "../../theme";
import '../../estilos/chat.css';
import { sendMessageToChat, assignOperatorToChat } from '../../Services/signalRService.js';
import { useSelector } from 'react-redux';

const Chat = ({ chatId }) => {
    const theme = useTheme();
    const colors = codigos(theme.palette.mode);

    const chatStore = useSelector((state) => state.chatStore); 
    const chats = chatStore.chatList;
    const elChatto = chats?.find(c => c.id === chatId) || null;

 


    const [messages, setMessages] = useState([]); // Estado para los mensajes
    const [newMessage, setNewMessage] = useState(''); // Estado para el nuevo mensaje
    const messagesEndRef = useRef(null); // Ref para el auto scroll

    // Efecto para scroll con nuevo mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);



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

 
    const doSomething = async (chatId) => {
        await assignOperatorToChat(chatId);
    }

    useEffect(() => {
        doSomething(chatId);
    }, [chatId])

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            //  setMessages((prevMessages) => [...prevMessages, { text: newMessage, isSentByMe: true }]);

            // Enviar el mensaje a SignalR

            const senderTypeId = 2; //2 siempre es usuario operador
            try {
                // Llamar a sendMessageToChat desde SignalRService
                await sendMessageToChat(chatId, senderTypeId, newMessage);
            } catch (err) {
                console.error("Error al enviar mensaje:", err);
            }
        }
    };

    return (
        <Card variant="outlined">
            <CardContent>
                <h2>Chat {chatId}</h2>

                {/*Seccion para ver los mensajes*/}

                <Box className="chat-box">
                    {elChatto?.messages?.map((msg, index) => (
                        <div
                            key={index}
                            className={msg.senderType === '2' ? "message-sent" : "message-received"}
                        >
                            <p className="message">{msg.content}</p>
                            <span className="time">
                                {new Date(msg.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Div para el final de los mensajes */}
                </Box>

                {/*Seccion para escribir un mensaje*/}

                <Box display="flex">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <Button variant="contained" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
                        Enviar
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Chat;