import { createSlice } from '@reduxjs/toolkit';
import { getFlows, createFlow, deleteFlow } from '../../Services/flowService';
import { act } from 'react';

const flowSlice = createSlice({
    name: 'flow',
    initialState: {
        flowsList: [],
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(getFlows.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getFlows.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flowsList = action.payload;
            })
            .addCase(getFlows.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Create
            .addCase(createFlow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createFlow.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flowsList.push(action.payload);
            })
            .addCase(createFlow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteFlow.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteFlow.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.flowsList = state.flowsList.filter((flow) => flow.id !== action.payload);
            })
            .addCase(deleteFlow.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { setFlows, addFlow } = flowSlice.actions;

export default flowSlice.reducer;
