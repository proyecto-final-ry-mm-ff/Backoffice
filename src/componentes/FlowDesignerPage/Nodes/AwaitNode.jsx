import React from 'react';
import { Handle, Position } from '@xyflow/react';

const AwaitNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#555555' }}>
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Left} id="target" />

            {/* Contenido del nodo */}
            <div>
                <label>Esperar respuesta</label>
            </div>

            {/* Puerto de salida */}
            <Handle type="source" position={Position.Right} id="source" />
        </div>
    );
};

export default AwaitNode;
