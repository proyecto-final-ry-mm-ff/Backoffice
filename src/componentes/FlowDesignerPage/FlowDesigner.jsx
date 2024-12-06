import React, { useRef, useCallback } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider, useDnD } from './DnDContext';
import FlowSideBar from './FlowSideBar';
import { useEffect } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import TextNode from './Nodes/TextNode';
import ButtonNode from './Nodes/ButtonNode';

const initialNodes = [
    { id: '1', type: 'textNode', position: { x: 450, y: 300 }, data: { label: '1' } },
    //{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [
    //{ id: 'e1-2', source: '1', target: '2' }
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowDesigner = ({ onBackToList }) => {
    const reactFlowWrapper = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Arrastrar elementos al canvas
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
            };
            console.log(newNode);
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );


    const nodeTypes = {
        textNode: TextNode,
    };

    const handleSaveFlow = (flowData) => {
        console.log('Flow guardado:', flowData);
        // TODO implementar guardado de flow
    };

    return (<>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
            {/* Sidebar */}
            <FlowSideBar />
            {/* Flow Designer */}
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* TopBar */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px',
                    }}
                >
                    <TextField
                        label="Nombre del Diagrama"
                        variant="outlined"
                        size="small"
                        sx={{ flex: 1, marginRight: '10px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onBackToList}
                        sx={{ marginRight: '10px' }}
                    >
                        Volver a la Lista
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveFlow}
                    >
                        Guardar
                    </Button>
                </Box>

                <div style={{ width: '100%', height: '80vh' }} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}

                        onConnect={onConnect}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        nodeTypes={nodeTypes}
                    >
                        <Controls />
                        <MiniMap />
                        <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>
                </div>
            </Box>
        </Box>
    </>
    );
}

export default () => (
    <ReactFlowProvider>
        <DnDProvider>
            <FlowDesigner />
        </DnDProvider>
    </ReactFlowProvider>
);

