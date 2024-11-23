import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Chat from './Chat';
import ChatList from './ChatList';
import { ColorModeContext, useMode, codigos } from '../../theme';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import Topbar from '../Global/Topbar';
import Sidebar from '../Global/Sidebar';



export default function ChatPage() {

    const [theme, colorMode] = useMode();
    const [selectedChat, setSelectedChat] = useState(); // Estado para el chat seleccionado
    const colors = codigos(theme.palette.mode);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar />
                    <main className='content'>
                        <Topbar />
                        <div>
                            <Grid container spacing={2}>
                                <Grid item xs={3} md={2.5}>
                                    <Box>
                                        <ChatList onChatSelect={setSelectedChat} />
                                    </Box>
                                </Grid>
                                <Grid item xs={6} md={7}>
                                    {selectedChat &&
                                        <Box>
                                            <Chat chatId={selectedChat} />
                                        </Box>
                                    }

                                </Grid>
                                <Grid item xs={3} md={2.5}>
                                    <Box>
                                        <ChatList onChatSelect={setSelectedChat} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}