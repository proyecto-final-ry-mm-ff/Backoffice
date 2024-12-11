import React, { useState } from 'react';
import { CssBaseline, Box, Grid, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode, colorsList } from '../../theme';
import FlowsList from './FlowsList';
import Sidebar from '../Global/Sidebar';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from './DnDContext';
const FlowPage = () => {
    const [theme, colorMode] = useMode();
    const colors = colorsList(theme.palette.mode);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                    <main className='content'>
                        <ReactFlowProvider> {/*importnate*/}
                            <div className='dashboard-content'>
                                <DnDProvider>
                                    <FlowsList />
                                </DnDProvider>
                            </div>
                        </ReactFlowProvider>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default FlowPage;