import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from './theme';
import { store } from './redux/store';
import Login from './componentes/Login/Login';
import ChatPage from './componentes/ChatPage/ChatPage';
import FlowDesigner from './componentes/FlowDesignerPage/FlowPage';
import Configuracion from './componentes/ConfigPage/Configuracion';
import AppContainer from './AppContainer';
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
                  <Route path="/chatPage" element={<ChatPage />} />
                  <Route path="/flowDesigner" element={<FlowDesigner />} />
                  <Route path="/configuracion" element={<Configuracion />} />
                  <Route path="/" element={<Navigate to="/chatPage" />} />
                  <Route path="/dashboard" element={<Navigate to="/chatPage" />} />
                  <Route path="*" element={<p>No se encontró la ruta!</p>} />
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
