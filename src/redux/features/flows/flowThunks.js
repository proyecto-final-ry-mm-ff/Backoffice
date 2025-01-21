import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleFlowActive as toggleFlowActiveService } from "../../../Services/flowService";

export const toggleFlowActiveThunk = createAsyncThunk(
  "flows/toggleFlowActive",
  async (id, thunkAPI) => {
    try {
      const updatedFlow = await toggleFlowActiveService(id);
      return updatedFlow;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
