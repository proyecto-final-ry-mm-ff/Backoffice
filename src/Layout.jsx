import React from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import { ColorModeContext, useMode, colorsList } from './theme';
import Sidebar from './componentes/Global/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [theme] = useMode();
    const colors = colorsList(theme.palette.mode);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100%',

            }}
        >
            <Sidebar
                sx={{
                    flex: '1 0 20%',
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