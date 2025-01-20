// src/redux/features/clients/clientsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchClients as fetchClientsService,
  postClient as postClientService,
  deleteClient as deleteClientService,
  putClient,
} from "../../../Services/clientsService";

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, thunkAPI) => {
    try {
      return await fetchClientsService();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching clients"
      );
    }
  }
);

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (clientDto, thunkAPI) => {
    try {
      // Transformar allowedDomainsJson a allowedDomains
      const transformedClient = {
        name: clientDto.name,
        allowedDomains: clientDto.allowedDomainsJson, // Renombrar propiedad
      };

      console.log("Transformed client:", transformedClient);

      // Llamar al servicio con el formato correcto
      return await postClientService(transformedClient);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error creating client"
      );
    }
  }
);

export const removeClient = createAsyncThunk(
  "clients/removeClient",
  async (id, thunkAPI) => {
    try {
      await deleteClientService(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting client"
      );
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, clientDto }, thunkAPI) => {
    try {
      await putClient(id, clientDto); // Llama al servicio para actualizar el cliente
      return { id, clientDto }; // Devuelve el ID y los datos actualizados al reducer
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
