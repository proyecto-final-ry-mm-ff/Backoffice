import React from "react";
import { useDnD } from "./DnDContext";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { colorsList } from "../../../theme";

const FlowSideBar = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      component="aside"
      sx={{
        padding: "10px",
        textAlign: "center",
        minWidth: "100px",
        width: "11%",
        backgroundColor: colors.background[200],
        height: "100%",
        boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px" }}>
        Nodos
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px", // Espaciado entre los nodos
        }}
      >
        {[
          { label: "Inicio", type: "startNode" },
          { label: "Texto", type: "textNode" },
          { label: "Botón", type: "buttonNode" },
          { label: "Acción", type: "actionNode" },
        ].map((node) => (
          <Paper
            key={node.type}
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
            sx={{
              padding: "10px",
              backgroundColor: colors.background[100],
              textAlign: "center",
              cursor: "grab",
              "&:hover": {
                backgroundColor: colors.background[200],
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {node.label}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default FlowSideBar;
