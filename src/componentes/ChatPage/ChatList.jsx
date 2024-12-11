import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { colorsList } from '../../theme';

export default function ChatList({ onChatSelect }) { // Recibe la función como prop

    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    const chatStore = useSelector((state) => state.chatStore);
    const chats = chatStore.chatList;

    const handleChatClick = (chatId) => {
        onChatSelect(chatId);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '20px',
            backgroundColor: colors.background[600],
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

            borderRight: `1px solid ${colors.border[400]}`,
        }}
        >
            <Box
                sx={{
                    marginBottom: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: `1px solid ${colors.border[600]}`,
                    paddingBottom: '8px',
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
                    Chats
                </Typography>
            </Box>

            <Box sx={{ overflowY: 'auto' }}>
                {chats?.length > 0 ? (
                    chats?.map((chat) => (
                        <Box
                            variant="outlined"
                            onClick={() => handleChatClick(chat.id)}
                            style={{ cursor: 'pointer' }}
                        >
                            <Box>
                                Chat {chat.id}
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography> No hay chats pendientes </Typography>
                )}
            </Box>
        </Box >
    );
}