import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as assignmentService from "../services/assignmentService";

// Create Assignment
export const createAssignment = createAsyncThunk(
    "assignment/createAssignment",
    async (assignmentData, { rejectWithValue }) => {
        try {
            const response = await assignmentService.createAssignment(assignmentData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
// Get Assignments by Classroom ID
export const getAssignmentsByClassroomId = createAsyncThunk(
    "assignment/getAssignmentsByClassroomId",
    async (classroomId, { rejectWithValue }) => {
        try {
            const response = await assignmentService.getAssignmentsByClassroomId(classroomId);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);
const assignmentSlice = createSlice({
    name: "assignments",
    initialState: {
        assignments: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        // Create Assignment
        builder
            // CREATE
            .addCase(createAssignment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createAssignment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createAssignment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // FETCH BY CLASSROOM
            .addCase(getAssignmentsByClassroomId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAssignmentsByClassroomId.fulfilled, (state, action) => {
                state.loading = false;
                state.assignments = action.payload;
            })
            .addCase(getAssignmentsByClassroomId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = assignmentSlice.actions;

export default assignmentSlice.reducer;
