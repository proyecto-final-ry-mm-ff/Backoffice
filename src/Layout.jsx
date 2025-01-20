import React, { useEffect } from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import { ColorModeContext, useMode, colorsList } from './theme';
import Sidebar from './componentes/Extras/Sidebar';
import { Outlet } from 'react-router-dom';
import { connectToHub } from './Services/signalRService';

const Layout = () => {
    const [theme] = useMode();
    const colors = colorsList(theme.palette.mode);

    useEffect(() => {
        const [navigationEntry] = performance.getEntriesByType("navigation");

        const doConnect = async () => {
            try {
                await connectToHub();
            } catch (error) {
                console.error('Error connecting to hub:', error);
            }
        };

        if (navigationEntry?.type === "reload") {
            doConnect();
            console.log("La página se recargó (F5).");
        } else {
            console.log("No fue refresh (o no se pudo detectar).");
        }
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',
            }}
        >
            <Sidebar
                sx={{
                    maxWidth: '300px',
                    minWidth: '250px',
                }}
            />
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;