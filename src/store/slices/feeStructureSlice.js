import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as feeStructureService from "../services/feeStructureService";

// Create Fee Structure
export const createFeeStructure = createAsyncThunk(
  "feeStructure/createFeeStructure",
  async (feeData, { rejectWithValue }) => {
    try {
      const response = await feeStructureService.createFeeStructure(feeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFeeStructures = createAsyncThunk(
  "feeStructure/getFeeStructures",
  async (_, { rejectWithValue }) => {
    try {
      const response = await feeStructureService.getFeeStructures();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create Fee Head
export const createFeeHead = createAsyncThunk(
  "feeStructure/createFeeHeads",
  async ({ fee_structure_id, heads }, { rejectWithValue }) => {
    try {
      console.log("payload in thunk:", heads);

      const response = await feeStructureService.createFeeHead(
        fee_structure_id,
        heads
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Create Fee Installment
export const createFeeInstallment = createAsyncThunk(
  "feeStructure/createFeeInstallment",
    async ({ structureId, installments }, { rejectWithValue }) => {
    try {
      const response = await feeStructureService.createFeeInstallment(structureId, installments);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }   
    }
);

// Create Fee Discount
export const createFeeDiscount = createAsyncThunk(
  "feeStructure/createFeeDiscount",
    async ({ structureId, discounts }, { rejectWithValue }) => {
    try {
      const response = await feeStructureService.createFeeDiscount(structureId, discounts);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    }
);

// Create Fine Rule
export const createFineRule = createAsyncThunk(
  "feeStructure/createFineRule",
    async ({ structureId, fineData }, { rejectWithValue }) => {
    try {
      const response = await feeStructureService.createFineRule(structureId, fineData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
    }
);

const feeStructureSlice = createSlice({
  name: "feeStructure",
  initialState: {   
    feeStructures: [],
    feeHeads: [],
    feeInstallments: [],
    feeDiscounts: [],
    fineRules: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder) => {
        // Create Fee Structure 
        builder
            .addCase(createFeeStructure.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFeeStructure.fulfilled, (state, action) => {
                state.loading = false;
                state.feeStructures.push(action.payload);
            })
            .addCase(createFeeStructure.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //get Fee Structures
            .addCase(getFeeStructures.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFeeStructures.fulfilled, (state, action) => {
                state.loading = false;
                state.feeStructures = action.payload;
            })
            .addCase(getFeeStructures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })  
            // Create Fee Head
            .addCase(createFeeHead.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFeeHead.fulfilled, (state, action) => {
                state.loading = false;
                state.feeHeads.push(action.payload);
            })
            .addCase(createFeeHead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Fee Installment
            .addCase(createFeeInstallment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFeeInstallment.fulfilled, (state, action) => {
                state.loading = false;
                state.feeInstallments.push(action.payload);
            })
            .addCase(createFeeInstallment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Fee Discount
            .addCase(createFeeDiscount.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFeeDiscount.fulfilled, (state, action) => {
                state.loading = false;
                state.feeDiscounts.push(action.payload);
            })
            .addCase(createFeeDiscount.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })  
            // Create Fine Rule
            .addCase(createFineRule.pending, (state) => {
                state.loading = true;
            })
            .addCase(createFineRule.fulfilled, (state, action) => {
                state.loading = false;
                state.fineRules.push(action.payload);
            })
            .addCase(createFineRule.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })  
    },
});
export default feeStructureSlice.reducer;
export const { resetState } = feeStructureSlice.actions;