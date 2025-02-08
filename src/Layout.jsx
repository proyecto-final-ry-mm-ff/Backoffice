import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Sidebar from './componentes/Extras/Sidebar';
import { Outlet } from 'react-router-dom';
import { connectToHub } from './Services/signalRService';

const Layout = () => {

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
