import React, { useRef, useCallback } from 'react';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider, useDnD } from './DnDContext';
import FlowSideBar from './FlowSideBar';
import { useState } from 'react';
import { createFlow } from '../../Services/flowService';
import { Dispatch } from '@reduxjs/toolkit';
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
import StartNode from './Nodes/StartNode';
import ActionNode from './Nodes/ActionNode';
import AwaitNode from './Nodes/AwaitNode';
import { useDispatch } from 'react-redux';

const initialNodes = [{
    id: '0',
    type: 'startNode',
    position: { x: 150, y: 150 },
    //data: { label: '1' }
},];
const initialEdges = [
    //{ id: 'e1-2', source: '1', target: '2' }
];

let id = 1;
const getId = () => `${id++}`;

const FlowDesigner = ({ onBackToList }) => {
    const reactFlowWrapper = useRef(null);
    const dispatch = useDispatch();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); //Creamos y actualizamos lista de nodos
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); //Creamos y actualizamos lista de conexiones

    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD(); //Trae el tipo del nodo almacenado en Drag n' Drop Context

    const [channel, setChannel] = useState(''); // Estado para el select
    const [diagramName, setDiagramName] = useState(''); // Estado para el nombre del diagrama

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    // Mapeo de nodos
    const nodeTypes = {
        textNode: TextNode,
        buttonNode: ButtonNode,
        startNode: StartNode,
        actionNode: ActionNode,
        awaitNode: AwaitNode
    };
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
            setNodes((nds) => nds.concat(newNode));

        },
        [screenToFlowPosition, type],
    );

    const handleSaveFlow = async () => {
        const formattedNodes = nodes.map((node) => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: { text: node.data?.label || '' },
        }));

        const formattedEdges = edges.map((edge) => ({
            source: edge.source,
            target: edge.target,
        }));

        const flowData = {
            nodes: formattedNodes,
            edges: formattedEdges,
        };

        const newFlow = {
            Nombre: diagramName,
            Canal: channel,
            Autor: '',
            Activo: false,
            Data: JSON.stringify(flowData, null, 2),
        };

        console.log(newFlow)
        try {
            dispatch(createFlow(newFlow));
            onBackToList();
        } catch (error) {
            console.log('Error al crear el Flow:', error);
        }
    };

    return (<>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>

            <FlowSideBar />
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* TopBar */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', }}>
                    <TextField
                        label="Nombre del Diagrama"
                        variant="outlined"
                        size="small"
                        value={diagramName}
                        onChange={(e) => setDiagramName(e.target.value)}
                        sx={{ flex: 1, marginRight: '10px' }}
                    />

                    <FormControl size="small" sx={{ marginRight: '10px' }}>
                        <InputLabel>Seleccione el canal</InputLabel>
                        <Select
                            value={channel}
                            onChange={(e) => setChannel(e.target.value)}
                        >
                            <MenuItem value="Embebido">Embebido</MenuItem>
                            <MenuItem value="Instagram">Instagram</MenuItem>
                            <MenuItem value="Facebook">Facebook</MenuItem>
                        </Select>
                    </FormControl>
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

export default FlowDesigner;

