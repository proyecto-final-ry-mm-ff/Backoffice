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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

  const [isDialogOpen, setIsDialogOpen] = useState(false); // Díalogo de creación / edición de un cliente
  const [selectedClient, setSelectedClient] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false); // Dialogo de confirmación al eliminar
  const [clientToDelete, setClientToDelete] = useState(null);

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
    setSelectedClient({ name: "", allowedDomainsJson: "" });
    setIsDialogOpen(true);
  };

  const handleSaveClient = async (formData) => {
    try {
      if (selectedClient?.id) {
        await dispatch(
          updateClient({ id: selectedClient.id, clientDto: formData })
        ).unwrap();
      } else {
        await dispatch(createClient(formData)).unwrap();
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
      throw error;
    }
  };

  // Eliminar ->
  const confirmDeleteClient = (client) => {
    setClientToDelete(client);
    setIsConfirmDialogOpen(true);
  };

  // Confirmar ->
  const handleDeleteClient = async () => {
    if (clientToDelete) {
      await dispatch(removeClient(clientToDelete.id));
      setIsConfirmDialogOpen(false);
      setClientToDelete(null);
    }
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
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                {["Nombre", "URL", ""].map((header, index) => (
                  <TableCell
                    key={header || index}
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
                  <TableCell
                    sx={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {client.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      overflow: "hidden",
                    }}
                  >
                    {client.allowedDomainsJson &&
                    client.allowedDomainsJson.length > 0
                      ? client.allowedDomainsJson.join(", ")
                      : "Sin dominios asignados"}
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      sx={{
                        m: 1,
                        backgroundColor: colors.buttonPrimary[100],
                        minWidth: "unset",
                        width: "65px",
                        height: "38px",
                        "&:hover": {
                          backgroundColor: colors.buttonPrimaryHover[100],
                        },
                      }}
                      onClick={() => handleEditClient(client)}
                    >
                      <EditOutlinedIcon sx={{ fontSize: "24px" }} />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        m: 1,
                        backgroundColor: colors.accentRed[100],
                        minWidth: "unset",
                        width: "65px",
                        height: "38px",
                        "&:hover": {
                          backgroundColor: colors.accentRed[300],
                        },
                      }}
                      onClick={() => confirmDeleteClient(client)}
                    >
                      <DeleteOutlinedIcon sx={{ fontSize: "24px" }} />
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
      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el cliente{" "}
            <strong>{clientToDelete?.name}</strong> y sus permisos asociados?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmDialogOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteClient}
            sx={{
              backgroundColor: colors.accentRed[300],
              "&:hover": { backgroundColor: colors.accentRed[600] },
            }}
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientsPage;
