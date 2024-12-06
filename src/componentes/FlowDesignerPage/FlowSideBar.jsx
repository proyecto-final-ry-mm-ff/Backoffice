import React from 'react';
import { useDnD } from './DnDContext';

const FlowSideBar = () => {
    const [_, setType] = useDnD();

    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside style={{ margin: '10px', border: 'solid 1px #555555', borderRadius: '5px', paddingTop: '10px', textAlign: 'center', width: '13vh', }}>
            <div >
                <div> <h3>Nodos</h3>  </div>
                {/* "Start" node */}
                <div
                    style={{ padding: '10px' }}
                    className="dndnode input"
                    onDragStart={(event) => onDragStart(event, 'startNode')}
                    draggable
                >
                    Inicio
                </div>
                {/* "Text" node */}
                <div
                    style={{ padding: '10px' }}
                    className="dndnode input"
                    onDragStart={(event) => onDragStart(event, 'textNode')}
                    draggable
                >
                    Texto
                </div>
                {/* "Button" node */}
                <div
                    style={{ padding: '10px' }}
                    className="dndnode input"
                    onDragStart={(event) => onDragStart(event, 'buttonNode')}
                    draggable
                >
                    Botón
                </div>
                {/* "Action" node */}
                <div
                    style={{ padding: '10px' }}
                    className="dndnode input"
                    onDragStart={(event) => onDragStart(event, 'actionNode')}
                    draggable
                >
                    Acción
                </div>


            </div>
        </aside >
    );
};

export default FlowSideBar;
