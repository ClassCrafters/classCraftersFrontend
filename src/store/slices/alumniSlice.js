import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as alumniService from "../services/alumniService";

export const createAlumni = createAsyncThunk(
    "alumni/createAlumni",
    async (alumniData, { rejectWithValue }) => {
        try {
            const response = await alumniService.createAlumni(alumniData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllAlumnis = createAsyncThunk(
    "alumni/getAllAlumnis",
    async (_, { rejectWithValue }) => {
        try {
            const response = await alumniService.getAllAlumnis();
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAlumniById = createAsyncThunk(
    "alumni/getAlumniById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await alumniService.getAlumniById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateAlumni = createAsyncThunk(
    "alumni/updateAlumni",
    async (updates, { rejectWithValue }) => {
        try {
            const response = await alumniService.updateAlumni(updates.id, updates);
            return response; // ✅ return updated alumni
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteAlumni = createAsyncThunk(
    "alumni/deleteAlumni",
    async (id, { rejectWithValue }) => {
        try {
            await alumniService.deleteAlumni(id);
            return id; // ✅ return the deleted alumni id
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const alumniSlice = createSlice({
    name: "alumni",
    initialState: {
        alumnis: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.alumnis = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createAlumni.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAlumni.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnis.push(action.payload);
            })
            .addCase(createAlumni.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getAllAlumnis.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllAlumnis.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnis = Array.isArray(action.payload.data)
                    ? action.payload.data
                    : [];
            })

            .addCase(getAllAlumnis.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(getAlumniById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAlumniById.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnis = action.payload;
            })
            .addCase(getAlumniById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateAlumni.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAlumni.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnis = state.alumnis.map((alumni) =>
                    alumni.id === action.payload.id ? action.payload : alumni
                );
            })
            .addCase(updateAlumni.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteAlumni.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAlumni.fulfilled, (state, action) => {
                state.loading = false;
                state.alumnis = state.alumnis.filter(
                    (alumni) => alumni.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteAlumni.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = alumniSlice.actions;
export default alumniSlice.reducer;