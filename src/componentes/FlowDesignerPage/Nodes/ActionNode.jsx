import React from "react";
import { Handle, Position } from "@xyflow/react";

const ActionNode = ({ data }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#555555",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* Puerto de entrada */}
      <Handle type="target" position={Position.Left} id="target" />

      {/* Contenido del nodo */}
      <div>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Acción:
        </label>
        <select
          value={data.label || ""}
          onChange={(e) => data.onChange && data.onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            background: "#fff",
            color: "#000",
          }}
        >
          <option value="" disabled>
            Selecciona una acción
          </option>
          <option value="Llamar Operador">Llamar Operador</option>
          <option value="Generar Ticket">*No Implementado* Generar Ticket</option>
          <option value="Registrar Mail">*No Implementado* Registrar Mail</option>
        </select>
      </div>
    </div>
  );
};

export default ActionNode;
