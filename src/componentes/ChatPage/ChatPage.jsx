import React, { useState } from 'react';
import Chat from './Chat';
import ChatList from './ChatList';
import { Box } from '@mui/material';

const ChatPage = () => {
    const [selectedChat, setSelectedChat] = useState(); // Estado para el chat seleccionado

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'hidden',
                height: '100%',
            }}
        >
            {/* Lista de chats izquierda */}
            <Box
                sx={{
                    flex: '0 0 20%', // Fija la lista al 20% del ancho
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #ddd',
                    padding: '10px',
                    //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    overflowY: 'auto', // Scroll vertical si es necesario
                }}
            >
                <ChatList onChatSelect={setSelectedChat} />
            </Box>

            {/* Chat principal */}
            <Box
                sx={{
                    flex: '1 0 60%', // Fija el chat principal al 60% del ancho
                    backgroundColor: '#ffffff',
                    // padding: '20px',
                    overflowY: 'auto', // Scroll vertical si es necesario
                }}
            >
                <Chat chatId={selectedChat?.id} />
            </Box>

            {/* Lista de chats derecha */}
            <Box
                sx={{
                    flex: '0 0 20%', // Fija la lista al 20% del ancho
                    backgroundColor: '#ffffff',
                    borderLeft: '1px solid #ddd',
                    padding: '10px',
                    overflowY: 'auto', // Scroll vertical si es necesario
                }}
            >
                <ChatList onChatSelect={setSelectedChat} />
            </Box>
        </Box>
    );
}

export default ChatPage;
