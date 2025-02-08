import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";
import { colorsList } from "../../theme";
import { useToast } from "../context/ToastContext"; // Importamos el hook

const ClientDeleteDialog = ({ open, onClose, onConfirm, clientName }) => {
  const theme = useTheme();
  const colors = colorsList(theme.palette.mode);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast(); // Usamos el toast global



  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(); // Ejecuta la función de confirmación pasada como prop
      onClose(); // Cierra el diálogo solo si la operación es exitosa
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      showToast(
        "Error al eliminar el cliente. Por favor contacte con soporte",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={isLoading ? undefined : onClose}>
      <DialogTitle>
        <strong>{clientName}</strong>{" "}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          ¿Estás seguro de que deseas eliminar el cliente{" "}
          <strong>{clientName}</strong>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={isLoading}
          sx={{
            backgroundColor: colors.accentRed[300],
            "&:hover": { backgroundColor: colors.accentRed[600] },
          }}
        >
          {isLoading ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientDeleteDialog;
