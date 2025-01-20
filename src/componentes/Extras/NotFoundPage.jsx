import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colorsList } from "../../theme";

const NotFoundPage = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirige a la página principal o cualquier ruta deseada
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: `linear-gradient(170deg, ${colors.background[400]}, ${colors.background[700]})`,
        color: "#fff",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "64px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 2,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        ¡Ups! No hemos podido encontrar la página que buscas.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoHome}
        sx={{
          padding: "10px 20px",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
      >
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFoundPage;
