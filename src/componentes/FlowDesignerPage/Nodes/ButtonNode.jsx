import React from 'react';
import { Handle, Position } from '@xyflow/react';

const ButtonNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#555555' }}>
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Left} id="target" />

            {/* Contenido del nodo */}
            <div>
                <label style={{ textAlign: 'center' }}>Botón</label>
                <input
                    type="text"
                    value={data.label || ''}
                    onChange={(e) => data.onChange && data.onChange(e.target.value)} // Verifica que onChange exista
                    style={{
                        borderColor: 'transparent',
                        width: '100%',
                        marginTop: '5px',
                        background: '#999999',
                    }}
                    placeholder="Escribe un nombre"
                />

            </div>

            {/* Puerto de salida */}
            <Handle type="source" position={Position.Right} id="source" />
        </div>
    );
};


export default ButtonNode;
