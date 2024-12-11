import React from 'react';
import { Box, useTheme } from '@mui/material';

const AppContainer = ({ children }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                backgroundColor: theme.palette.background.default, // Fondo del marco
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: '1600px', // Limita el ancho máximo
                    height: '100%',
                    maxHeight: '96%', // Limita la altura máxima
                    backgroundColor: theme.palette.background.paper, // Fondo del contenido
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)', // Sombra para efecto de profundidad
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default AppContainer;
