import React, { useState } from 'react';
import { CssBaseline, Box, Grid, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode, codigos } from '../../theme';
import CanalesList from './CanalesList'; // Importa la lista de canales
import Topbar from '../Global/Topbar';
import Sidebar from '../Global/Sidebar';
import Flow from './Flow'; // Asegúrate de tener un componente para editar el flujo

const FlowPage = () => {
    const [theme, colorMode] = useMode();
    const colors = codigos(theme.palette.mode);
    const [selectedFlowId, setSelectedFlowId] = useState(); // Estado para el flujo seleccionado

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <Sidebar />
                    <main className='content'>
                        <Topbar />
                        <div className='dashboard-content'>
                            <Box sx={{ padding: 2 }}>
                                <h1 style={{ color: colors.grey[100] }}>Crear Diagrama de Flujo</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={1} md={1}>
                                        <CanalesList setSelectedFlowId={setSelectedFlowId} /> {/* Pasa la función para seleccionar el flujo */}
                                    </Grid>
                                    <Grid item xs={9} md={11}>
                                        {selectedFlowId ? (
                                            <Flow flowId={selectedFlowId} /> // Muestra el área de edición si hay un flujo seleccionado
                                        ) : (
                                            <Box sx={{ padding: 2, textAlign: 'center', border: '1px dashed #ffff', height: '60vh' }}>
                                                <h3 style={{ color: colors.grey[600] }}>Selecciona un diagrama de flujo para editar.</h3>
                                            </Box>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default FlowPage;