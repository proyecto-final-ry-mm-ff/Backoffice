import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid';


//Colores
import { ColorModeContext, useMode, codigos } from '../../theme';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';

//TopBar
import Topbar from '../Global/Topbar';
import Sidebar from '../Global/Sidebar';

export default function Configuracion() {

    const [theme, colorMode] = useMode();

    const colors = codigos(theme.palette.mode);


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>

                    <Sidebar />
                    <main className='content' >
                        <Topbar />
                        <div className='dashboard-content'>
                            <Grid container spacing={2}>
                                <Grid item xs={5} md={3}>
                                    <Box>Configuracion</Box>
                                </Grid>
                                <Grid item xs={7} md={3}>
                                    <Box></Box>
                                </Grid>
                            </Grid>
                        </div>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
