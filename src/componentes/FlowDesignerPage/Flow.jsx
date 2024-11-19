import React from 'react';
import { Box, Typography } from '@mui/material';

const Flow = ({ flowId }) => {
    return (
        <Box sx={{ padding: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6">Diagrama de flujo {flowId}</Typography>
            {/* Aquí puedes agregar la lógica para renderizar y editar el diagrama de flujo */}
            <Box sx={{ height: '60vh', background: '#f9f9f9', border: '1px dashed #ccc', marginTop: 2 }}>
                {/* Espacio para el diagrama de flujo */}
                <Typography variant="body2" color="textSecondary" textAlign="center" sx={{ padding: 2 }}>
                    /*Aquí es donde aparecerá el diagrama de flujo*/
                </Typography>
            </Box>
        </Box>
    );
};

export default Flow;