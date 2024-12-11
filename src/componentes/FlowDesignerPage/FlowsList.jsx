import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFlows, deleteFlow, createFlow } from '../../Services/flowService';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import FlowDesigner from './FlowDesigner';
import { setSelectedFlow } from '../../redux/features/flows/flowSlice';
import { useTheme } from '@mui/material/styles';

const FlowsList = () => {
    const dispatch = useDispatch();
    const { flowsList, status, error } = useSelector((state) => state.flowStore);
    const theme = useTheme();
    const colors = theme.palette;

    const [isDesigning, setIsDesigning] = useState(false);

    useEffect(() => {
        dispatch(getFlows());
    }, [dispatch]);

    const handleEditFlow = (flow) => {
        dispatch(setSelectedFlow(flow));
        setIsDesigning(true);
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

    const handleDelete = (id) => {
        dispatch(deleteFlow(id));
    };

    if (status === 'loading') {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color={colors.neutral}>
                    Cargando Flows...
                </Typography>
            </Box>
        );
    }

    if (status === 'failed') {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h6" color={colors.neutral[500]}>
                    Error: {error}
                </Typography>
            </Box>
        );
    }

    return (
        <Box p={4}>
            {isDesigning ? (
                <FlowDesigner
                    onBackToList={() => {
                        setIsDesigning(false);
                    }}
                />
            ) : (
                <Box>
                    <Button
                        variant="contained"
                        sx={{
                            mb: 3,
                            backgroundColor: colors.neutral[500],
                            color: colors.neutral[500],
                            '&:hover': {
                                backgroundColor: colors.neutral[500],
                            },
                        }}
                        onClick={handleCreateFlow}
                    >
                        Crear Nuevo Diagrama
                    </Button>
                    {flowsList.length > 0 ? (
                        <TableContainer
                            component={Paper}
                            sx={{
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                borderRadius: 2,
                                backgroundColor: colors.background.paper,
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: colors.background.default }}>
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
                                        <TableRow
                                            key={flow.id}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: colors.background.paper,
                                                },
                                            }}
                                        >
                                            <TableCell>{flow.id}</TableCell>
                                            <TableCell>{flow.nombre || 'Sin nombre'}</TableCell>
                                            <TableCell>{flow.canal || 'No especificado'}</TableCell>
                                            <TableCell>{flow.autor || 'No especificado'}</TableCell>
                                            <TableCell>
                                                <Typography
                                                    color={flow.activo ? colors.neutral[500] : colors.neutral[500]}
                                                >
                                                    {flow.activo ? 'Sí' : 'No'}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        mr: 1,
                                                        color: colors.neutral[500],
                                                        borderColor: colors.neutral[500],
                                                        '&:hover': {
                                                            backgroundColor: colors.neutral[100],
                                                        },
                                                    }}
                                                    onClick={() => handleEditFlow(flow)}
                                                >
                                                    Editar
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        color: colors.neutral[500],
                                                        borderColor: colors.neutral[500],
                                                        '&:hover': {
                                                            backgroundColor: colors.neutral[100],
                                                        },
                                                    }}
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
                        <Typography variant="h6" color={colors.textSecondary.main} textAlign="center">
                            No hay flows disponibles.
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default FlowsList;
