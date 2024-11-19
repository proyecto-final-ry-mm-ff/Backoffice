// CanalesList.jsx
import React from 'react';
import { Box, Card, CardContent, Typography, Grid, useTheme } from '@mui/material';

import { ColorModeContext, codigos } from "../../theme";

const CanalesList = ({ setSelectedFlowId }) => {
    const flowPreviews = Array.from({ length: 4 }); // Simulación de canales disponibles

    const theme = useTheme();
    const colors = codigos(theme.palette.mode);

    const handleFlowClick = (id) => {
        setSelectedFlowId(id); // Establece el ID del canal seleccionado
    };

    return (
        <Box>
            <Grid container spacing={2}>
                {flowPreviews.map((_, index) => (
                    <Grid item xs={12} key={index}>
                        <Card variant="outlined" style={{ backgroundColor: colors.primary }} onClick={() => handleFlowClick(index + 1)}>
                            <CardContent>
                                <Typography variant="body2" color="x">
                                    Canal {index + 1}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
};

export default CanalesList;