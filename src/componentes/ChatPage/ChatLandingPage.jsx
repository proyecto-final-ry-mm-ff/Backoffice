import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import { colorsList } from '../../theme';

const ChatLandingPage = () => {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: colors.background[400],
                textAlign: "center",
            }}
        >
            {/* Ícono o imagen */}
            <ChatIcon
                sx={{
                    fontSize: "100px",
                    color: "#1976d2", // Color primario de Material UI
                    marginBottom: "16px", // Espaciado con el texto
                }}
            />

            {/* Texto centrado */}
            <Typography
                variant="h4"
                sx={{
                    color: "#424242",
                    fontWeight: "bold",
                }}
            >
                Sherlock HUB
            </Typography>
            <Typography
                variant="body1"
                sx={{
                    color: "#757575",
                    marginTop: "8px",
                }}
            >
                Selecciona un chat para comenzar.
            </Typography>
        </Box>
    );
};

export default ChatLandingPage;
