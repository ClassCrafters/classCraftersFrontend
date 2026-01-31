import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as leaveService from "../services/leaveService";

export const applyLeave = createAsyncThunk(
    "leave/applyLeave",
    async (data) => {
        const { data: leave } = await leaveService.applyLeave(data);
        return leave;
    }
);

export const fetchLeaves = createAsyncThunk(
    "leave/fetchLeaves",
    async (params) => {
        const data  = await leaveService.getMyLeaves(params);
        return data;
    }
);

export const getAllLeaves = createAsyncThunk(
    "leave/getAllLeaves",
    async (params) => {
        const data  = await leaveService.getAllLeaves(params);
        return data;
    }
);

export const reviewLeave = createAsyncThunk(
    "leave/reviewLeave",
    async (data) => {
        const { data: leave } = await leaveService.reviewLeave(data.id, data.status);
        return leave;
    }
);

export const cancelLeave = createAsyncThunk(
    "leave/cancelLeave",
    async (data) => {
        const { data: leave } = await leaveService.cancelLeave(data.id);
        return leave;
    }
);

const leaveSlice = createSlice({
    name: "leave",
    initialState: {
        leaves: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyLeave.pending, (state) => {
                state.loading = true;
            })
            .addCase(applyLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves.push(action.payload);
            })
            .addCase(applyLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchLeaves.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getAllLeaves.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(getAllLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(reviewLeave.pending, (state) => {
                state.loading = true;
            })
            .addCase(reviewLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = state.leaves.map((leave) =>
                    leave.id === action.payload.id ? action.payload : leave
                );
            })
            .addCase(reviewLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(cancelLeave.pending, (state) => {
                state.loading = true;
            })
            .addCase(cancelLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = state.leaves.filter((leave) => leave.id !== action.payload.id);
            })
            .addCase(cancelLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default leaveSlice.reducer;

