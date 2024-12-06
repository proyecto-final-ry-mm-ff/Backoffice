import React from 'react';
import { Handle, Position } from 'react-flow-renderer';

const ActionNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '5px', background: '#555555' }}>
            {/* Puerto de entrada */}
            <Handle type="target" position={Position.Left} id="target" />

            {/* Contenido del nodo */}
            <div>
                <label>Acción</label>
            </div>
        </div>
    );
};

export default ActionNode;
