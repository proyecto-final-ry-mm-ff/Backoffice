import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

// Estilo CSS para el contenedor de chats
const chatListStyles = {
    maxHeight: '85vh', // Ajusta la altura máxima según tu diseño
    overflowY: 'auto', // Habilita el scrollbar vertical
};

export default function ChatList({ onChatSelect }) {

    const chats = useSelector((state) => state.chats); // Obtiene la lista de chats desde Redux


    const handleChatClick = (chat) => {
        onChatSelect(chat); // Llama a la función con el chat seleccionado
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
                <Grid container spacing={2}>
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <Grid item xs={12} key={chat.id}>
                                <Card
                                    variant="outlined"
                                    onClick={() => handleChatClick(chat)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <CardContent>
                                        <Typography variant="body2">
                                            Chat {chat.id} - {chat.name || 'Sin nombre'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography>No hay chats disponibles</Typography>
                    )}
                </Grid>
            </Box>
        </Box>
    );
}