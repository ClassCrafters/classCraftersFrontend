import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as paymentService from "../services/paymentService";

// ✅ FETCH ALL PAYMENTS    
export const fetchAllPayments = createAsyncThunk(
  "payment/getFeeStructures",
  async (_, { rejectWithValue }) => { 
    try {
      const response = await paymentService.getFeeStructures();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    loading: false,
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // FETCH ALL PAYMENTS
        .addCase(fetchAllPayments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAllPayments.fulfilled, (state, action) => {
            state.loading = false;
            state.payments = action.payload;
        })
        .addCase(fetchAllPayments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default paymentSlice.reducer;