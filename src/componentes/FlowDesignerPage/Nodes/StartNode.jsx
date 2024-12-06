import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const StartNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#555555' }}>

            {/* Contenido del nodo */}
            <div>
                <label>Inicio</label>

            </div>

            {/* Puerto de salida */}
            <Handle type="source" position={Position.Right} id="source" />
        </div>
    );
};

export default StartNode;
