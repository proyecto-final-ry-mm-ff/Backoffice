import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { colorsList } from '../../theme';

export default function ChatList({ onChatSelect }) {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    const chatsList = useSelector((state) => state.chatStore.chatsList);
    console.log(chatsList);
    const [selectedTab, setSelectedTab] = useState(0); // Controla el tab activo

    // Manejador de cambio de tab
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // ChatsList filtrados según la tab seleccionada
    //const chatslist = selectedTab === 0 ? chatStore.ChatList : chatStore.myChats; // All = 0  MY = 1

    const handleChatClick = (chat) => {
        onChatSelect(chat);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '16px',
                backgroundColor: colors.background[500],
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Encabezado principal */}
            <Box
                sx={{
                    marginBottom: '8px',
                    paddingBottom: '8px',
                    borderBottom: `1px solid ${colors.border[400]}`,
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        color: colors.textPrimary[200],
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                    }}
                >
                    ChatsList
                </Typography>
            </Box>

            {/* Tabs para alternar entre "All" y "My" */}
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                    marginBottom: '8px',
                    '& .MuiTab-root': {
                        color: colors.textSecondary[500],
                        fontWeight: 'bold',
                    },
                    '& .Mui-selected': {
                        color: colors.textPrimary[500],
                    },
                    '& .MuiTabs-indicator': {
                        backgroundColor: colors.accentBlue[500],
                    },
                }}
                variant="fullWidth"
            >
                <Tab label="All" />
                <Tab label="My" />
            </Tabs>

            {/* Lista de chatslist */}
            <Box
                sx={{
                    overflowY: 'auto',
                    marginTop: '8px',
                }}
            >
                {chatsList?.length > 0 ? (
                    chatsList.map((chat) => (
                        <Box
                            key={chat.id}
                            onClick={() => handleChatClick(chat)}
                            sx={{
                                padding: '10px',
                                marginBottom: '8px',
                                backgroundColor: colors.background[200],
                                borderRadius: '8px',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: colors.background[300],
                                },
                            }}
                        >
                            <Typography variant="body1">
                                {chat.id === selectedTab ? `Chat Seleccionado: ${chat.id}` : `Chat ${chat.id}`}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>No hay chats disponibles</Typography>
                )}
            </Box>
        </Box>
    );
}
