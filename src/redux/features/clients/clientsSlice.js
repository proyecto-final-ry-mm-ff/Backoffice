// src/redux/features/clients/clientsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchClients, createClient, removeClient } from "./clientsThunks";

const initialState = {
  clients: [],
  status: "idle",
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
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
      });
  },
});

export default clientsSlice.reducer;
