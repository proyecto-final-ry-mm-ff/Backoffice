import React from 'react';
import { useDnD } from './DnDContext';
import { NodeTypes } from './Nodes/NodeTypes';
import { ReactFlowProvider } from '@xyflow/react';

const FlowSideBar = () => {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside>
            <div className="description">NODOS</div>
            {/* "Texto" node */}
            <div
                className="dndnode input"
                onDragStart={(event) => onDragStart(event, 'textNode')}
                draggable
            >
                Texto
            </div>
        </aside>
    );
};

export default FlowSideBar;
