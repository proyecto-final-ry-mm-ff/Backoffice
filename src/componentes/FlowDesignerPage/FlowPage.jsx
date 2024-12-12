
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from './Recursos/DnDContext';
import FlowsList from './FlowsList';

const FlowPage = () => {

    const [theme, colorMode] = useMode();

    return (

        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ReactFlowProvider>
                    <DnDProvider>
                        <FlowsList />
                    </DnDProvider>
                </ReactFlowProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default FlowPage;

/*

<ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='app'>
                   <main className='content'>
                        <ReactFlowProvider> 
                        <div >
                        <DnDProvider>
                            <FlowsList />
                        </DnDProvider>
                    </div>
                </ReactFlowProvider>
            </main>
        </div>
    </ThemeProvider>
</ColorModeContext.Provider>
*/