import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useMode, ColorModeContext } from './theme';
import { store } from './redux/store';
import Login from './componentes/Extras/Login';
import ChatPage from './componentes/ChatPage/ChatPage';
import FlowPage from './componentes/FlowDesignerPage/FlowPage';
import ConfigPage from './componentes/ConfigPage/ConfigPage';
import AppContainer from './AppContainer';
import NotFoundPage from './componentes/Extras/NotFoundPage';
import Layout from './Layout';
import './estilos/scrollbar.css'
import './index.css'
import ProtectedRoute from './componentes/Extras/ProtectedRoute';
const App = () => {
  const [theme, colorMode] = useMode();
  const isLogged = localStorage.getItem('logged') === 'true';
  return (
    <Provider store={store}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={isLogged ? <Navigate to="/dashboard" /> : <Login />} />
                <Route element={<Layout />}>
                  <Route path="/chat-page" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
                  <Route path="/flow-designer" element={<ProtectedRoute><FlowPage /></ProtectedRoute>} />
                  <Route path="/config" element={<ProtectedRoute><ConfigPage /></ProtectedRoute>} />
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Navigate to="/chat-page" /></ProtectedRoute>} />
                  <Route path="*" element={<ProtectedRoute><NotFoundPage /></ProtectedRoute>} />
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
