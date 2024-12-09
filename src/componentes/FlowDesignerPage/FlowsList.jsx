import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlows, deleteFlow, createFlow, } from '../../Services/flowService';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FlowDesigner from './FlowDesigner';
import { setSelectedFlow } from '../../redux/features/flows/flowSlice';

const FlowsList = ({ onCreateFlow, onEditFlow }) => {
    const dispatch = useDispatch();
    const { flowsList, status, error } = useSelector((state) => state.flowStore);

    const [isDesigning, setIsDesigning] = useState(false);

    // Cargar los flows al montar el componente
    useEffect(() => {
        dispatch(getFlows());
    }, [dispatch]);

    const handleEditFlow = (flow) => {
        dispatch(setSelectedFlow(flow)); // Configura el flujo seleccionado en Redux

        setIsDesigning(true); // Cambia a la vista del diseñador
    };

    const handleCreateFlow = async () => {
        try {
            const newFlow = {
                nombre: '',
                canal: '',
                autor: 'admin',
                activo: false,
                data: '{}',
            };

            const createdFlow = await dispatch(createFlow(newFlow)).unwrap();
            dispatch(setSelectedFlow(createdFlow));
            setIsDesigning(true);

        } catch (err) {
            console.error('Error al crear el flujo:', err);
        }
    };


    // Manejar la eliminación de un flujo
    const handleDelete = (id) => {
        dispatch(deleteFlow(id));
    };

    // Mostrar estados de carga, error o datos
    if (status === 'loading') return <p>Cargando Flows...</p>;
    if (status === 'failed') return <p>Error: {error}</p>;

    return (
        <div>
            {isDesigning ? (
                <FlowDesigner
                    onBackToList={() => {
                        setIsDesigning(false); // Volver a la lista
                    }}
                />
            ) : (
                <div >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCreateFlow}
                        style={{ marginBottom: '20px' }}
                    >
                        Crear Nuevo Diagrama
                    </Button>
                    {flowsList.length > 0 ? (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
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
                                            <TableCell>{flow.nombre || 'Sin nombre'}</TableCell>
                                            <TableCell>{flow.canal || 'No especificado'}</TableCell>
                                            <TableCell>{flow.autor || 'No especificado'}</TableCell>
                                            <TableCell>{flow.activo ? 'Sí' : 'No'}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => {
                                                        handleEditFlow(flow); // Establece el ID del flujo seleccionado

                                                    }}
                                                    style={{ marginRight: '10px' }}
                                                >
                                                    Editar
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleDelete(flow.id)}
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
                        <p>No hay flows disponibles.</p>
                    )}
                </div>
            )}
        </div>
    );

};

export default FlowsList;
