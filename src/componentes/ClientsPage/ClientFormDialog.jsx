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
    allowedDomains: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Actualiza el formulario cuando cambian los datos iniciales
  useEffect(() => {
    if (open) {
      setFormData({
        name: initialData.name || "",
        facebookId: initialData.facebookId || "-",
        allowedDomains: Array.isArray(initialData.allowedDomains)
          ? initialData.allowedDomains.join(", ")
          : initialData.allowedDomains,
      });
    }
  }, [open, initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const updatedData = {
      name: formData.name,
      facebookId: formData.facebookId,
      allowedDomains: formData.allowedDomains
        .split(",") // Divide la cadena en un array
        .map((url) => url.trim()) // Elimina espacios extra
        .filter((url) => url), // Filtra valores vacíos
    };

    try {
      await onSave(updatedData);
      onClose();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    } finally {
      setIsLoading(false);
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
          label="Facebook ID"
          name="facebookId"
          value={formData.facebookId}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="URL's"
          name="allowedDomains"
          value={formData.allowedDomains}
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
