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

export const fetchFeeStructureById = createAsyncThunk(
  "payment/getFeeStructureById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paymentService.getFeeStructureById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchPaymentsByInstitutionId = createAsyncThunk(
  "payment/getPaymentsByInstitutionId",
  async (institutionId, { rejectWithValue }) => { 
    try {
      const response = await paymentService.getPaymentsByInstitutionId(institutionId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const createFeeAssignment = createAsyncThunk(
  "payment/createFeeAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.createFeeAssignment(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFeeAssignments = createAsyncThunk(
  "payment/getFeeAssignments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentService.getFeeAssignments();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFeeAssignmentById = createAsyncThunk(
  "payment/getFeeAssignmentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paymentService.getFeeAssignmentById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateFeeAssignment = createAsyncThunk(
  "payment/updateFeeAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.updateFeeAssignment(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteFeeAssignment = createAsyncThunk(
  "payment/deleteFeeAssignment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await paymentService.deleteFeeAssignment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const collectFees = createAsyncThunk(
  "payment/collectFees",
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentService.collectFees(data);
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
    fullStructureById:[],
    paymentsByInstitutionId: [],
    assignPayments: [],
    collectFees: [],
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

        // FETCH FEE STRUCTURE BY ID
        builder
        .addCase(fetchFeeStructureById.pending, (state) => {
            state.loading = true;
            state.error = null;
        } 
        )
        .addCase(fetchFeeStructureById.fulfilled, (state, action) => {
            state.loading = false;
            state.fullStructureById = action.payload;
            // You can handle the fetched fee structure by ID here if needed
        })
        .addCase(fetchFeeStructureById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // FETCH PAYMENTS BY INSTITUTION ID
        builder
        .addCase(fetchPaymentsByInstitutionId.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPaymentsByInstitutionId.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentsByInstitutionId = action.payload;
        })
        .addCase(fetchPaymentsByInstitutionId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // CREATE FEE ASSIGNMENT
        builder
        .addCase(createFeeAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createFeeAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.assignPayments.push(action.payload);
        })
        .addCase(createFeeAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // GET FEE ASSIGNMENTS
        builder
        .addCase(getFeeAssignments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFeeAssignments.fulfilled, (state, action) => {
            state.loading = false;
            state.assignPayments = action.payload;
        })
        .addCase(getFeeAssignments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // GET FEE ASSIGNMENT BY ID
        builder
        .addCase(getFeeAssignmentById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getFeeAssignmentById.fulfilled, (state, action) => {
            state.loading = false;
            state.assignPayments = action.payload;
        })
        .addCase(getFeeAssignmentById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // UPDATE FEE ASSIGNMENT
        builder
        .addCase(updateFeeAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateFeeAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.assignPayments = state.assignPayments.map((assign) =>
                assign.id === action.payload.id ? action.payload : assign
            );
        })
        .addCase(updateFeeAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // DELETE FEE ASSIGNMENT
        builder
        .addCase(deleteFeeAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteFeeAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.assignPayments = state.assignPayments.filter(
                (assign) => assign.id !== action.payload.id
            );
        })
        .addCase(deleteFeeAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // COLLECT FEES
        builder
        .addCase(collectFees.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(collectFees.fulfilled, (state, action) => {
            state.loading = false;
            state.collectFees = state.collectFees.map((collect) =>
                collect.id === action.payload.id ? action.payload : collect
            );
        })
        .addCase(collectFees.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default paymentSlice.reducer;