import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from './theme';
import { store } from './redux/store';
import Login from './componentes/Login/Login';
import ChatPage from './componentes/ChatPage/ChatPage';
import FlowPage from './componentes/FlowDesignerPage/FlowPage';
import ConfigPage from './componentes/ConfigPage/ConfigPage';
import AppContainer from './AppContainer';
import NotFoundPage from './componentes/Global/NotFoundPage';
import Layout from './Layout';
import './estilos/scrollbar.css'
import './index.css'
const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<Layout />}>
                  <Route path="/chat-page" element={<ChatPage />} />
                  <Route path="/flow-designer" element={<FlowPage />} />
                  <Route path="/config" element={<ConfigPage />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/dashboard" element={<Navigate to="/chat-page" />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AppContainer>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Provider>
  );
};

export default App;
