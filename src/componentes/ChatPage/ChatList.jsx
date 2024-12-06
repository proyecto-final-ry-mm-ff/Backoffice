import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useSelector } from 'react-redux';
// Estilo CSS para el contenedor de chats
const chatListStyles = {
    maxHeight: '85vh', // Ajusta la altura máxima según tu diseño
    overflowY: 'auto', // Habilita el scrollbar vertical
};

export default function ChatList({ onChatSelect }) { // Recibe la función como prop
    // Simulamos una lista de chats vacía
    const chatPreviews = Array.from({ length: 20 }); // Genera un array con 20 elementos vacíos


    const chatStore = useSelector((state) => state.chatStore);
    const chats = chatStore.chatList;
    // Obtiene la lista de chats desde Redux

    const handleChatClick = (chatId) => {
        onChatSelect(chatId); // Llama a la función con el chat seleccionado
    };

    return (
        <Box >
            <Box display="flex" alignItems="center" justifyContent="space-between" >
                <h3>Chats</h3>
                <Button variant="contained" color="primary">
                    < FilterListIcon />
                </Button>
            </Box>

            <Box sx={chatListStyles}>
                {chats?.length > 0 ? (
                    chats?.map((chat) => (
                        <Card
                            variant="outlined"
                            onClick={() => handleChatClick(chat.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <CardContent>

                                Chat {chat.id}

                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography>No hay chats disponibles</Typography>
                )}
            </Box>
        </Box>
    );
}