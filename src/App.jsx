import React, { useEffect } from 'react'; // Importa useEffect correctamente
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
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
import './estilos/scrollbar.css';
import './index.css';
import ProtectedRoute from './componentes/Extras/ProtectedRoute';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { login } from './redux/features/user/userSlice'; // Importa la acción de login

const persistor = persistStore(store);

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppContainer>
                <BrowserRouter>
                  <Routes>
                    {/* Ruta para el login */}
                    <Route path="/login" element={localStorage.getItem('logged') === 'true' ? <Navigate to="/dashboard" /> : <Login />} />

                    {/* Rutas protegidas */}
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
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
