import { createSlice } from "@reduxjs/toolkit";
import {
  fetchClients,
  createClient,
  removeClient,
  updateClient,
} from "./clientsThunks";

const initialState = {
  clients: [],
  status: "idle",
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {}, // Deja vacío si no necesitas acciones sincrónicas
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(removeClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client.id !== action.payload
        );
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        const { id, clientDto } = action.payload;
        const index = state.clients.findIndex((c) => c.id === id);
        if (index !== -1) {
          state.clients[index] = { id, ...clientDto }; // Reemplaza los datos del cliente
        }
      });
  },
});

export default clientsSlice.reducer;
