import React from "react";
import { Handle, Position } from "@xyflow/react";
import { colorsList } from "../../../theme";
import { useTheme } from "@mui/material";

const TextNode = ({ data }) => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: colors.background[300],
      }}
    >
      {/* Puerto de entrada */}
      <Handle type="target" position={Position.Left} id="target" />

      {/* Contenido del nodo */}
      <div
        style={{
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <label
          style={{
            textAlign: "center",
          }}
        >
          Texto
        </label>
        <textarea
          type="text"
          value={data.label || ""}
          onChange={(e) => data.onChange && data.onChange(e.target.value)} // Verifica que onChange exista
          style={{
            marginTop: "10px",
            padding: "5px",
            width: "100%",
            height: "auto",
            overflow: "hidden", // Evita barras de desplazamiento
            resize: "none", // No permite al usuario cambiar el tamaño
            borderRadius: "4px",
            border: "1px solid #ccc",
            boxSizing: "border-box", // Incluye padding en el ancho total
          }}
          placeholder="Escribe un texto"
          rows={1} // Configuración inicial
          onInput={(e) => {
            e.target.style.height = "auto"; // Reinicia la altura
            e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta al contenido
          }}
        />
      </div>

      {/* Puerto de salida */}
      <Handle type="source" position={Position.Right} id="source" />
    </div>
  );
};

export default TextNode;
