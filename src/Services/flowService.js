import { createAsyncThunk } from "@reduxjs/toolkit";

const urlFlow = `${process.env.REACT_APP_API_URL}/Flow`;


// Obtener todos los flujos
export const getFlows = createAsyncThunk(
  "flows/getFlows",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(urlFlow);
      if (!response.ok) throw new Error("Error al obtener los flujos");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Crear un nuevo flujo
export const createFlow = createAsyncThunk(
  "flows/createFlow",
  async (newFlow, thunkAPI) => {
    try {
      const response = await fetch(urlFlow, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFlow),
      });
      if (!response.ok) throw new Error("Error al crear el flujo");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Actualizar un flujo existente
export const updateFlow = createAsyncThunk(
  "flows/updateFlow",
  async (updatedFlow, thunkAPI) => {
    try {
      const response = await fetch(urlFlow, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFlow),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar el flujo: ${response.statusText}`);
      }

      const updatedFlowFromBackend = await response.json(); // Espera el flujo actualizado
      return updatedFlowFromBackend;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Eliminar un flujo
export const deleteFlow = createAsyncThunk(
  "flows/deleteFlow",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${urlFlow}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el flujo");
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleFlowActive = async (id) => {
  try {
    const response = await fetch(`${urlFlow}/toggle-active/${id}`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error(
        `Error al alternar el estado del flujo: ${response.statusText}`
      );
    }

    const updatedFlow = await response.json();

    return updatedFlow;
  } catch (error) {
    console.error("Error en toggleFlowActive:", error);
    throw error;
  }
};
