import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const TextNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#f9f9f9' }}>
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Left} id="target" />

            {/* Contenido del nodo */}
            <div>
                <label>Texto:</label>
                <input
                    type="text"
                    //value={data.label}
                    onChange={(e) => data.onChange(e.target.value)} // Dispara un evento para actualizar el texto
                    style={{ width: '100%', marginTop: '5px' }}
                    placeholder="Escribe aquí..."
                />
            </div>

            {/* Puerto de salida */}
            <Handle type="source" position={Position.Right} id="source" />
        </div>
    );
};

export default TextNode;
