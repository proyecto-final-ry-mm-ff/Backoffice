
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from './Recursos/DnDContext';
import FlowsList from './FlowsList';

const FlowPage = () => {
    return (
        <ReactFlowProvider>
            <DnDProvider>
                <FlowsList />
            </DnDProvider>
        </ReactFlowProvider>
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