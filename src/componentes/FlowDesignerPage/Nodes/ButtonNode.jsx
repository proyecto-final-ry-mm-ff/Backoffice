// ButtonNode.jsx
import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const ButtonNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#e6f7ff' }}>
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Top} style={{ background: '#555' }} />

            {/* Contenido del nodo */}
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={data.label}
                    onChange={(e) => data.onChange(e.target.value)} // Actualiza el "Nombre"
                    style={{ width: '100%', marginTop: '5px' }}
                />
                <button
                    onClick={() => alert(`Hola, ${data.label}`)} // Acción del botón
                    style={{ marginTop: '10px', padding: '5px 10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '3px' }}
                >
                    Saludar
                </button>
            </div>

            {/* Puerto de salida */}
            <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />
        </div>
    );
};

export default ButtonNode;
