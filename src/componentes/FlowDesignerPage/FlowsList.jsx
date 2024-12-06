import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFlow, deleteFlow, getFlows } from '../../Services/flowService';
import FlowDesigner from './FlowDesigner';
import { ReactFlowProvider } from '@xyflow/react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from '@mui/material';

const FlowList = () => {
    const dispatch = useDispatch();
    const { flowsList, status, error } = useSelector((state) => state.flowStore);

    // Estado para manejar si es visible la lista o el canvas
    const [isDesigning, setIsDesigning] = useState(false); // Estado para alternar entre lista y diseño
    const [selectedFlowId, setSelectedFlowId] = useState(null); // Almacena la ID del nuevo flow


    useEffect(() => {
        dispatch(getFlows());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteFlow(id));
    };

    const handleCreateFlow = () => {
        const newFlow = {
            nombre: '',
            canal: '',
            autor: '',
            activo: false,
        };
        try {
            const createdFlow = dispatch(createFlow(newFlow));
            setSelectedFlowId(createdFlow.id);
            setIsDesigning(true); // Cambia a la vista al diseñador
        } catch (error) {
            console.log('Error al crear el Flow:', error);
        }

    };

    const handleBackToList = () => {
        dispatch(getFlows()); //TODO no se asigna bien el id, queda en 0, al menos hasta q se vuelva a actualizar
        setSelectedFlowId(null); //Lipiar ID
        setIsDesigning(false);
    };

    if (status === 'loading') return <p>Cargando Flows...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <ReactFlowProvider>
            <div>
                {isDesigning ? (
                    <FlowDesigner flowId={selectedFlowId} onBackToList={handleBackToList} />
                ) : (
                    // Mostrar la lista de flujos
                    <>
                        <h3>Lista de Flows</h3>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => dispatch(getFlows())}
                            style={{ marginRight: '10px' }}
                        >
                            Actualizar Tabla
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCreateFlow}
                            style={{ marginRight: '10px' }}
                        >
                            Nuevo Diagrama
                        </Button>

                        {flowsList.length > 0 ? (
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Id</TableCell>
                                            <TableCell>Nombre</TableCell>
                                            <TableCell>Canal</TableCell>
                                            <TableCell>Autor</TableCell>
                                            <TableCell>Activo</TableCell>
                                            <TableCell>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {flowsList.map((flow) => (
                                            <TableRow key={flow.id}>
                                                <TableCell>{flow.id}</TableCell>
                                                <TableCell>{flow.nombre}</TableCell>
                                                <TableCell>{flow.canal}</TableCell>
                                                <TableCell>{flow.autor}</TableCell>
                                                <TableCell>{flow.activo ? 'Sí' : 'No'}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => handleDelete(flow.id)}
                                                        style={{ marginRight: '10px' }}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <p>No hay Flows disponibles</p>
                        )}
                    </>
                )}
            </div>
        </ReactFlowProvider>
    );
};

export default FlowList;
