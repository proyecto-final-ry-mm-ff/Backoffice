import React from 'react';
import { Box, CssBaseline, useTheme } from '@mui/material';
import { ColorModeContext, useMode, codigos } from './theme';
import Sidebar from './componentes/Global/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [theme] = useMode();
    const colors = codigos(theme.palette.mode);

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',
                backgroundColor: colors.background?.default || (theme.palette.mode === 'dark' ? '#202124' : '#FFFFFF'),
            }}
        >
            <Sidebar
                sx={{
                    flex: '1 0 20%',
                    maxWidth: '300px',
                    minWidth: '250px',
                    backgroundColor: colors.primary[500],
                    boxShadow: theme.palette.mode === 'dark' ? '2px 0 10px rgba(0, 0, 0, 0.5)' : '2px 0 10px rgba(0, 0, 0, 0.1)',
                }}
            />
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: theme.palette.mode === 'dark' ? 'inset 0 0 10px rgba(0, 0, 0, 0.5)' : 'inset 0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;