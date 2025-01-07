import React, { useState } from 'react';
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
  TextField,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { colorsList } from '../../theme';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const ClientsPageStyled = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);
  const [clients, setClients] = useState([]);

  const handleAddClient = () => {
    const newClient = {
      id: uuidv4().slice(0, 5), // Limitar ID a 5 caracteres
      name: '',
      URL: '',
    };
    setClients((prevClients) => [...prevClients, newClient]);
  };

  const handleDeleteClient = (id) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === id ? { ...client, [field]: value } : client
      )
    );
  };

  return (
    <Box sx={{ height: '100%', backgroundColor: colors.background[500] }}>
      
        {/* Encabezado */}
        <Box sx={{ padding: 2, display: 'flex', height: '64px', backgroundColor: colors.background[200] }}>          
            <Typography variant="h3">CLIENTES</Typography>
            <Button
            sx={{
                color: colors.textPrimary[500],
                marginLeft: 'auto',
                backgroundColor: colors.buttonPrimary[500],
                '&:hover': {
                backgroundColor: colors.buttonPrimary[400],
                },
            }}
            onClick={handleAddClient}
            >
            Agregar Cliente
            </Button>
        </Box>
        {/* Tabla */}
        <Box>
        <TableContainer
        sx={{
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: '20px',
          
          backgroundColor: colors.background.paper,
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'Nombre', 'URL', 'Eliminar'].map((header) => (
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
          <TableBody>
            {clients.map((client, index) => (
              <TableRow
                key={client.id}
                sx={{
                  height: '80px',
                  backgroundColor:
                    index % 2 === 0
                      ? colors.background[200]
                      : colors.background[300],
                  '&:hover': {
                    backgroundColor: colors.background[400],
                  },
                }}
              >
                <TableCell>{client.id}</TableCell>
                <TableCell>
                  <TextField
                    value={client.name}
                    onChange={(e) =>
                      handleInputChange(client.id, 'name', e.target.value)
                    }
                    placeholder="Nombre"
                    fullWidth
                    sx={{
                      '& .MuiInputBase-input': {
                        backgroundColor: colors.background[100],
                        borderRadius: '4px',
                        padding: '8px',
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={client.URL}
                    onChange={(e) =>
                      handleInputChange(client.id, 'URL', e.target.value)
                    }
                    placeholder="URL"
                    fullWidth
                    sx={{
                      '& .MuiInputBase-input': {
                        backgroundColor: colors.background[100],
                        borderRadius: '4px',
                        padding: '8px',
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      borderRadius: '100%',
                      minWidth: 'unset',
                      width: '35px',
                      height: '35px',
                    }}
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <DeleteOutlinedIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Box>
    </Box>
  );
};

export default ClientsPageStyled;
