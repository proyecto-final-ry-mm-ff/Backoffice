import React from 'react'
import { Box, Typography, useTheme } from '@mui/material';
import { colorsList } from '../../theme';

export default function ClientsPage() {
    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                background: `linear-gradient(170deg, ${colors.background[400]}, ${colors.background[700]})`,
                color: '#fff',
            }}
        >
            <Typography
                sx={{
                    fontSize: '364px',
                }}
            >
                😴
            </Typography>
        </Box>
    )
}
