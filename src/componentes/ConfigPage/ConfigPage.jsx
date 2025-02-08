import React from "react";
//Colores
import {  Box, Typography, useTheme } from "@mui/material";

import { colorsList } from "../../theme";

export default function Configuracion() {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

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
        :)
      </Typography>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Aún no tenemos configuraciones disponibles.
      </Typography>
    </Box>
  );
}
