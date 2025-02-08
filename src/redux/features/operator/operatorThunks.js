import { createAsyncThunk } from "@reduxjs/toolkit";
import { postOperator } from "../../../Services/operatorsService";

export const registerOperator = createAsyncThunk(
    "operators/register",
    async (_, thunkAPI) => {
        try {
            return await postOperator();
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data || "Error al registrar operador"
            );
        }
    }
);