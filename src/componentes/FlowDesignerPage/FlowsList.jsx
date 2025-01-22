import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlows, deleteFlow, createFlow } from "../../Services/flowService";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import FlowDesigner from "./FlowDesigner";
import { setSelectedFlow } from "../../redux/features/flows/flowSlice";
import { colorsList } from "../../theme";
import { toggleFlowActiveThunk } from "../../redux/features/flows/flowThunks";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const FlowsList = () => {
  const dispatch = useDispatch();
  const { flowsList, status, error } = useSelector((state) => state.flowStore);

  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);

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
      dispatch(setSelectedFlow(newFlow));
      setIsDesigning(true);
    } catch (err) {
      console.error('Error al crear el flujo:', err);
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteFlow(id));
  };

  const handleActiveToggle = (id) => {
    const selectedFlow = flowsList.find(flow => flow.id === id);
    console.log(selectedFlow);
    const flowsActivosMismoCanal = flowsList.filter(flow => flow.canal === selectedFlow.canal && flow.activo === true);
    console.log(flowsActivosMismoCanal);

    if (flowsActivosMismoCanal.length > 0 && !selectedFlow.activo) { // revisa si hay un flow activo con el mismo canal que el seleccionado y si el seleccionado esta inactivo (o sea se está queriendo activarlo)
      alert("Ya hay un flujo activo para ese canal, debe desactivarlo primero");
    }
    else {
      dispatch(toggleFlowActiveThunk(id));
    }
  }

  if (status === 'failed') {
    return (
      <Box
        sx={{
          padding: 4,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          backgroundColor: colors.background[100],
        }}
      >
        <Typography
          variant="h3"
        >
          Error: {error}
        </Typography>
      </Box>
    );

  };

  return (
    <Box sx={{ height: '100%', backgroundColor: colors.background[500] }}>
      {isDesigning ? (
        <FlowDesigner onBackToList={() => { setIsDesigning(false); }} />
      ) : (
        <Box sx={{

          width: '100%',
          height: '100%'
        }}>
          {/* Encabezado */}
          <Box sx={{ padding: 2, display: 'flex', height: '64px', backgroundColor: colors.background[200] }}>
            <Typography variant="h3" >
              DIAGRAMAS
            </Typography>
            <Button
              sx={{
                color: colors.textPrimary[500],
                marginLeft: 'auto',
                backgroundColor: colors.buttonPrimary[500],
                '&:hover': {
                  backgroundColor: colors.buttonPrimary[400]
                },
              }}
              onClick={handleCreateFlow}
            >
              <AddOutlinedIcon /> Nuevo Diagrama
            </Button>
          </Box>
          {flowsList.length > 0 ? (
            <TableContainer
              sx={{
                maxHeight: '88vh',
                overflowY: 'auto',
                padding: '20px',
                backgroundColor: colors.background.paper,
              }}
            >
              <Table>
                {/* Encabezado */}
                <TableHead>
                  <TableRow>
                    {['ID', 'Nombre', 'Canal', 'Autor', 'Activo', ''].map((header) => (
                      <TableCell
                        key={header}
                        sx={{
                          background: colors.background[400],
                          fontWeight: 'bold',
                          borderBottom: `1px solid ${colors.border[600]}`,
                        }}
                      >
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {/* Cuerpo */}
                <TableBody>
                  {flowsList.map((flow, index) => (
                    <TableRow
                      key={flow.id}
                      sx={{
                        height: '80px',
                        backgroundColor: index % 2 === 0 ? colors.background[200] : colors.background[300], // Alternar colores
                        '&:hover': {
                          backgroundColor: colors.background[400],
                        },
                      }}
                    >
                      <TableCell>
                        {flow.id}
                      </TableCell>
                      <TableCell >
                        {flow.nombre || 'Sin nombre'}
                      </TableCell>
                      <TableCell>
                        {flow.canal || 'No especificado'}
                      </TableCell>
                      <TableCell>
                        {flow.autor || 'No especificado'}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: flow.activo ? colors.accentGreen[100] : colors.accentRed[100],
                          fontWeight: 'bold',
                          width: '100px',
                        }}
                      >
                        <Button
                          variant="outlined"
                          sx={{
                            borderRadius: "100%",
                            color: flow.activo ? colors.accentGreen[100] : colors.accentRed[100],
                            borderColor: flow.activo ? colors.accentGreen[100] : colors.accentRed[100],
                            '&:hover': {
                              color: flow.activo ? colors.accentGreen[400] : colors.accentRed[400],
                              borderColor: flow.activo ? colors.accentGreen[400] : colors.accentRed[400],
                              background: flow.activo ? colors.background[600] : colors.background[200],
                            },
                            minWidth: 'unset',
                            width: '35px',
                            height: '35px'
                          }}
                          onClick={() => handleActiveToggle(flow.id)}
                        >
                          {flow.activo ? <DoneOutlinedIcon /> : <ClearOutlinedIcon />}
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ width: '260px' }} >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: colors.buttonPrimary[100],
                            minWidth: 'unset',
                            width: '50px',
                            '&:hover': {
                              backgroundColor: colors.buttonPrimaryHover[100],
                            },
                          }}
                          onClick={() => handleEditFlow(flow)}
                        >
                          <EditOutlinedIcon />
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            m: 1,
                            backgroundColor: colors.accentRed[100],
                            //color: colors.textPrimary[500],
                            minWidth: 'unset',
                            width: '50px',
                            //textTransform: 'none',
                            '&:hover': {
                              backgroundColor: colors.accentRed[300],
                            },
                          }}
                          onClick={() => handleDelete(flow.id)}
                        >
                          <DeleteOutlinedIcon />
                        </Button>

                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          ) : (
            <Box
              sx={{
                padding: 4,
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Typography variant="h3">
                No hay flows disponibles.
              </Typography>
            </Box>
          )}
        </Box>
      )
      }
    </Box >
  );
}

export default FlowsList;