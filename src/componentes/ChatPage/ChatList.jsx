import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

// Estilo CSS para el contenedor de chats
const chatListStyles = {
    maxHeight: '85vh', // Ajusta la altura máxima según tu diseño
    overflowY: 'auto', // Habilita el scrollbar vertical
};

export default function ChatList({ onChatSelect }) { // Recibe la función como prop
    // Simulamos una lista de chats vacía
    const chatPreviews = Array.from({ length: 20 }); // Genera un array con 20 elementos vacíos

    const handleChatClick = (index) => {
        // Crear un objeto de chat para pasar al seleccionar
        onChatSelect({ id: index + 1 });
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
                    {chatPreviews.map((_, index) => (
                        <Grid item xs={12} key={index}>
                            <Card variant="outlined" onClick={() => handleChatClick(index)} style={{ cursor: 'pointer' }}>
                                <CardContent>
                                    <Typography variant="body2">
                                        Chat {index + 1} - Vista previa
                                    </Typography>
                                    {/* Este será el espacio donde irán más detalles de cada chat */}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}