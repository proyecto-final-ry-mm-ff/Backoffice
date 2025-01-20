import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClientFormDialog from "./ClientFormDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClients,
  createClient,
  updateClient,
  removeClient,
} from "../../redux/features/clients/clientsThunks";
import { colorsList } from "../../theme";

const ClientsPage = () => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);
  const dispatch = useDispatch();

  const { clients, status } = useSelector((state) => state.clientsStore);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch, clients]);

  const handleEditClient = (client) => {
    setSelectedClient({
      id: client.id,
      name: client.name,
      allowedDomainsJson: client.allowedDomainsJson || [],
    });
    setIsDialogOpen(true);
  };

  const handleAddClient = () => {
    setSelectedClient({ name: "", allowedDomainsJson: "" }); // Datos vacíos
    setIsDialogOpen(true);
  };

  const handleSaveClient = async (formData) => {
    try {
      if (selectedClient?.id) {
        // Actualizar cliente existente
        await dispatch(
          updateClient({ id: selectedClient.id, clientDto: formData })
        ).unwrap();
      } else {
        // Crear nuevo cliente
        await dispatch(createClient(formData)).unwrap();
      }
      setIsDialogOpen(false); // Cerrar el diálogo solo si fue exitoso
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      throw error; // Propagar el error para manejarlo en el diálogo
    }
  };

  const handleDeleteClient = (id) => {
    dispatch(removeClient(id));
  };

  return (
    <Box sx={{ height: "100%", backgroundColor: colors.background[500] }}>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          height: "64px",
          backgroundColor: colors.background[200],
        }}
      >
        <Typography variant="h3">CLIENTES</Typography>
        <Button
          sx={{
            color: colors.textPrimary[500],
            marginLeft: "auto",
            backgroundColor: colors.buttonPrimary[500],
            "&:hover": {
              backgroundColor: colors.buttonPrimary[400],
            },
          }}
          onClick={handleAddClient}
        >
          <AddOutlinedIcon /> NUEVO CLIENTE
        </Button>
      </Box>
      {clients.length > 0 ? (
        <TableContainer
          sx={{
            maxHeight: "88vh",
            overflowY: "auto",
            padding: "20px",
            backgroundColor: colors.background.paper,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {["ID", "Nombre", "URL", "Acciones"].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      background: colors.background[400],
                      fontWeight: "bold",
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
                    height: "80px",
                    backgroundColor:
                      index % 2 === 0
                        ? colors.background[200]
                        : colors.background[300],
                    "&:hover": {
                      backgroundColor: colors.background[400],
                    },
                  }}
                >
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>
                    {client.allowedDomainsJson &&
                    client.allowedDomainsJson.length > 0
                      ? client.allowedDomainsJson.join(", ") // Combina las URLs en una cadena
                      : "Sin dominios asignados"}{" "}
                    {/* Muestra un texto si no hay URLs */}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: colors.buttonPrimary[100],
                        minWidth: "unset",
                        width: "50px",
                        "&:hover": {
                          backgroundColor: colors.buttonPrimaryHover[100],
                        },
                      }}
                      onClick={() => handleEditClient(client)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        m: 1,
                        backgroundColor: colors.accentRed[100],
                        //color: colors.textPrimary[500],
                        minWidth: "unset",
                        width: "50px",
                        //textTransform: 'none',
                        "&:hover": {
                          backgroundColor: colors.accentRed[300],
                        },
                      }}
                      onClick={() => handleDeleteClient(client.id)}
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
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Typography variant="h3">No hay clientes disponibles.</Typography>
        </Box>
      )}
      <ClientFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveClient}
        initialData={selectedClient || { name: "", allowedDomainsJson: "" }}
      />
    </Box>
  );
};

export default ClientsPage;
