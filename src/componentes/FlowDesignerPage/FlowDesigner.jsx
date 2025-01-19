import React, { useState, useRef, useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';
import { colorsList } from '../../theme';
import { useDnD } from './Recursos/DnDContext';
import FlowSideBar from './Recursos/FlowSideBar';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, useReactFlow, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useEffect } from 'react';

//Nodos
import NodeTypes from './Nodes/NodeTypes';
import { initializeNodeData } from './Nodes/NodeTypes';
//flowService
import { updateFlow, createFlow } from '../../Services/flowService';

/*const initialNodes = [{
    id: '0',
    type: 'startNode',
    position: { x: 150, y: 150 },
    //data: { label: '1' }
},];*/

const FlowDesigner = ({ onBackToList }) => {

    const theme = useTheme();
    const colors = colorsList(theme.palette.mode);

    const reactFlowWrapper = useRef(null);
    const selectedFlow = useSelector((state) => state.flowStore.selectedFlow);
    const dispatch = useDispatch();
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD(); //Trae el tipo del nodo almacenado en Drag n' Drop Context

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const memoizedNodes = useMemo(() => nodes, [nodes]);
    const memoizedEdges = useMemo(() => edges, [edges]);

    const [diagramName, setDiagramName] = useState('');
    const [channel, setChannel] = useState('');

    const getId = () => `node-${Date.now()}`;

    useEffect(() => {
        if (selectedFlow) {
            setDiagramName(selectedFlow.nombre || '');
            setChannel(selectedFlow.canal || '');
            if (selectedFlow.data) {
                const parsedData = JSON.parse(selectedFlow.data);

                const nodesWithLogic = (parsedData.nodes || []).map((node) => ({
                    ...node,
                    data: {
                        ...node.data,
                        onChange: (value) => onLabelChange(node.id, value), // Reasignar lógica de eventos
                    },
                }));

                setNodes(nodesWithLogic);
                setEdges(parsedData.edges || []);
            }
        }
    }, [selectedFlow]);


    const onLabelChange = useCallback(
        (id, value) => {
            setNodes((nds) =>
                nds.map((node) =>
                    node.id === id ? { ...node, data: { ...node.data, label: value } } : node
                )
            );
        },
        [setNodes]
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) =>
            addEdge({ ...params, condition: null }, eds)
        ),
        [setEdges]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: {
                    ...initializeNodeData(type),
                    onChange: (value) => onLabelChange(newNode.id, value), // Función para manejar cambios
                },
            };
            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, setNodes, onLabelChange]
    );

    const validateFlow = () => {
        const nodosInicio = nodes.filter((node) => node.type == "startNode");

        if((nodosInicio).length < 1) {
            throw new Error('Debe haber un nodo inicio');
        }

        if((nodosInicio).length > 1) {
            throw new Error('No puede haber más de un nodo inicio');
        }           
        // provisorio: se podrían poner estas validaciones en la activación de flujo, ver cual opcion es mejor
        // nodos desconectados        
        const idNodos = nodes.map(node => node.id);        
                
        const idNodosConectados = idNodos.filter((id) => edges.find(edge => edge.source === id || edge.target === id));
        if(idNodosConectados.length < nodes.length){
            throw new Error('No puede haber nodos desconectados');
        }        
        // sin canal seleccionado
        if(channel == ""){
            throw new Error('Debe seleccionar un canal');
        }
       
    }



    const handleSaveFlow = async () => {
        const formattedNodes = nodes.map((node) => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data,
        }));

        const formattedEdges = edges.map((edge) => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            condition: edge.condition
        }));

        const flowData = {
            id: selectedFlow?.id, // Incluye el ID del flujo
            nombre: diagramName, // Nombre actualizado
            canal: channel, // Canal actualizado
            autor: selectedFlow?.autor || 'Admin',
            activo: selectedFlow?.activo || false,
            data: JSON.stringify({ nodes: formattedNodes, edges: formattedEdges }),
        };        

        if(flowData.id){ // si el flow existe (esta siendo editado uno ya existente) hace el update

            flowData.activo = false; // para evitar que si se está modificando un flow activo y se le cambia el canal, puedan quedar 2 flows activos con el mismo canal            

            try {
                validateFlow();
                await dispatch(updateFlow(flowData)).unwrap();
                onBackToList();
            } catch (err) {
                console.error('Error al guardar el flujo:', err);
                alert('Error al guardar el flujo: ' + err.message);
            }
        }
        else{ // si está siendo creado un nuevo flow, se hace el create
            try {
                validateFlow();
                await dispatch(createFlow(flowData)).unwrap();                
                onBackToList();
            } catch (err) {
                console.error('Error al guardar el flujo:', err);
                alert('Error al guardar el flujo: ' + err.message);
            }

        }

        
        /*try {
            validateFlow();
            await dispatch(updateFlow(flowData)).unwrap();
            onBackToList();
        } catch (err) {
            console.error('Error al guardar el flujo:', err);
            alert('Error al guardar el flujo. Revisa los datos y vuelve a intentarlo.');
        }      */       
        
    };

    // validar conexiones entre nodos
    const isValidConnection = (connection) => {
        const {source, target} = connection;        

        const sourceNode = nodes.find((node)  => node.id == source);
        const targetNode = nodes.find((node)  => node.id == target);              

        if(source === target) { // para que no se conecte a si mismo
            return false;
        }
        if(sourceNode.type == "buttonNode" && targetNode.type == "buttonNode"){ // evitar que se conecten 2 botones
            return false;
        }

        return true;
    } 

    return (<>
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>


            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* TopBar */}
                <Box sx={{ padding: 2, display: 'flex', height: '64px', backgroundColor: colors.background[200] }}>
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
                        onClick={handleSaveFlow}
                    >
                        Guardar
                    </Button>
                    <Button
                        onClick={onBackToList}
                        sx={{ marginRight: '10px' }}
                    >
                        Volver a la Lista
                    </Button>
                </Box>

                <div style={{ display: 'flex', flexDirection: 'row', padding: 0, width: '100%', height: '100%' }} ref={reactFlowWrapper}>
                    <FlowSideBar />
                    <ReactFlow
                        nodes={memoizedNodes}
                        edges={memoizedEdges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}

                        onConnect={onConnect}
                        onDragOver={onDragOver}
                        onDrop={onDrop}
                        nodeTypes={NodeTypes}
                        isValidConnection={isValidConnection}
                    >
                        <Background variant="dots" gap={12} size={1} />
                    </ReactFlow>

                </div>
            </Box>
        </Box>
    </>
    );
}

export default FlowDesigner;

