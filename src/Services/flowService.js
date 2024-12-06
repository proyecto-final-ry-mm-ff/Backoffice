import { createAsyncThunk } from '@reduxjs/toolkit';

const urlApi = "http://localhost:5015/Flow";

export const getFlows = createAsyncThunk(
    'flow/getFlows', // Nombre del thunk
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${urlApi}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log(`Flows en el service -> ${data.length}`)
            return data; // Esto será action.payload en el fulfilled
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const createFlow = createAsyncThunk(
    'flow/createFlow',
    async (newFlow, { rejectWithValue }) => {
        try {
            const response = await fetch(urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFlow),
            });

            // Si la respuesta no es exitosa, lanza un error
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al crear el Flow');
            }

            // Retorna la respuesta convertida a JSON (no necesitas un 'await' extra aquí)
            return await response.json(); // Devuelve los datos del flujo recién creado
        } catch (error) {
            // Si ocurre un error, retorna el mensaje del error
            return rejectWithValue(error.message);
        }
    }
);


export const deleteFlow = createAsyncThunk(
    'flow/deleteFlow',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${urlApi}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el Flow');
            }

            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);



