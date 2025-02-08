import React from "react";
import { Box, useTheme } from "@mui/material";
import { ToastProvider } from "./context/ToastContext";

const AppContainer = ({ children }) => {
  const theme = useTheme();

  return (
    <ToastProvider>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: theme.palette.background.default, // Fondo del marco
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "1600px", // Limita el ancho máximo
            height: "96%",
            backgroundColor: theme.palette.background.paper, // Fondo del contenido
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)", // Sombra para efecto de profundidad
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
    </ToastProvider>
  );
};

export default AppContainer;
