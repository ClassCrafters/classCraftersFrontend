import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import * as attendanceService from "../services/attendanceService";
// Get Attendance Data by Date
export const getAttendanceDataByDate = createAsyncThunk(
    "attendance/getAttendanceDataByDate",   
    async (date, {rejectWithValue}) => {
        try {
            const response = await attendanceService.getAttendanceDataByDate(date);
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        attendanceData: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {   
        // Get Attendance Data by Date
        builder
            .addCase(getAttendanceDataByDate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAttendanceDataByDate.fulfilled, (state, action) => {
                state.loading = false;
                state.attendanceData = action.payload;
            })
            .addCase(getAttendanceDataByDate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default attendanceSlice.reducer;