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
      // Transformar allowedDomainsJson en allowedDomains
      const transformedClient = {
        name: clientDto.name,
        facebookId: clientDto.facebookId,
        allowedDomains: clientDto.allowedDomains,
      };

      console.log("Transformed client:", transformedClient);

      // Enviar al servicio
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
      const updatedClient = await putClient(id, clientDto);
      return { id, clientDto: updatedClient || clientDto }; // Usa el DTO si no hay respuesta
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
