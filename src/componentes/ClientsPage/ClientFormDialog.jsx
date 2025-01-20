import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";

const ClientFormDialog = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    allowedDomainsJson: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Actualiza el formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData.name || "",
        allowedDomainsJson: Array.isArray(initialData.allowedDomainsJson)
          ? initialData.allowedDomainsJson.join(", ")
          : initialData.allowedDomainsJson || "",
      });
    }
  }, [open, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true); // Mostrar indicador de carga

    const updatedData = {
      ...formData,
      allowedDomainsJson: formData.allowedDomainsJson
        .split(",")
        .map((url) => url.trim())
        .filter((url) => url), // Limpiar los dominios vacíos
    };

    try {
      await onSave(updatedData); // Esperar a que la acción sea satisfactoria
      onClose(); // Cerrar el diálogo si la acción fue exitosa
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <Dialog open={open} onClose={isLoading ? undefined : onClose}>
      <DialogTitle>
        {initialData?.id ? "Editar Cliente" : "Agregar Cliente"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="URL's"
          name="allowedDomainsJson"
          value={formData.allowedDomainsJson}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" disabled={isLoading}>
          Cancelar
        </Button>
        <Button onClick={handleSave} color="secondary" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientFormDialog;
