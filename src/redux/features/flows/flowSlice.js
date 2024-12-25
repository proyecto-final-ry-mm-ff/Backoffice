import { createSlice } from '@reduxjs/toolkit';
import { getFlows, createFlow, deleteFlow, updateFlow } from '../../../Services/flowService';

const initialState = {
    flowsList: [], // Lista de todos los flujos
    selectedFlow: null, // Flujo seleccionado para edición o creación
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
};

const flowSlice = createSlice({
    name: 'flows',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null; // Permite limpiar errores desde la UI
        },
        setSelectedFlow: (state, action) => {
            state.selectedFlow = action.payload; // Configura el flujo seleccionado
        },
        clearSelectedFlow: (state) => {
            state.selectedFlow = null; // Limpia el flujo seleccionado
        },
    },
    extraReducers: (builder) => {
        builder
            // Obtener Flujos
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
            // Crear Flujos
            .addCase(createFlow.fulfilled, (state, action) => {
                state.flowsList.push(action.payload);
            })
            // Eliminar Flujos
            .addCase(deleteFlow.fulfilled, (state, action) => {
                state.flowsList = state.flowsList.filter((flow) => flow.id !== action.payload);
            })
            // Update Flow
            .addCase(updateFlow.fulfilled, (state, action) => {
                const index = state.flowsList.findIndex((flow) => flow.id === action.payload.id);
                if (index !== -1) {
                    state.flowsList[index] = action.payload; // Actualiza el flujo en la lista
                }
            });
    },
});

export const { resetError, setSelectedFlow, clearSelectedFlow } = flowSlice.actions;
export default flowSlice.reducer;
