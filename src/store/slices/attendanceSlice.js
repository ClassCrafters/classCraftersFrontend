import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as attendanceService from "../services/attendanceService";
import * as staffAttendanceId from "../services/getstaffAttendaceService";
// Get Attendance Data by Date
export const getAttendanceDataByDate = createAsyncThunk(
  "attendance/getAttendanceDataByDate",
  async (date, { rejectWithValue }) => {
    try {
      const response = await attendanceService.getAttendanceDataByDate(date);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const postAttendanceDataStudents = createAsyncThunk(
  "attendance/postAttendanceDataStudents",
  async (attendanceData, { rejectWithValue }) => {
    try {
      const response =
        await attendanceService.postAttendanceDataStudents(attendanceData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// ================= GET MY STAFF ATTENDANCE =================
// export const getMyStaffAttendance = createAsyncThunk(
//   "attendance/getMyStaffAttendance",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await attendanceService.getMyPunchInAttendance();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const getMyStaffAttendanceID = createAsyncThunk(
  "attendance/getMyStaffAttendanceId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await staffAttendanceId.getMyPunchInAttendance();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// ================= STAFF PUNCH IN =================
export const staffPunchIn = createAsyncThunk(
  "attendance/staffPunchIn",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await attendanceService.staffPunchIn(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// ================= STAFF PUNCH OUT =================
export const staffPunchOut = createAsyncThunk(
  "attendance/staffPunchOut",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await attendanceService.staffPunchOut(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState: {
//     attendanceData: [],
//     loading: false,
//     error: null,
//   },
const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    attendanceData: [],
    loading: false,
    error: null,
    staffPunchInData: null,
    staffPunchOutData: null,
    attendanceId: null,
    isPunchedIn: false,
    staffData:[]
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
    // Post Attendance Data for Students
    builder
      .addCase(postAttendanceDataStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAttendanceDataStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.attendanceData = action.payload;
      })
      .addCase(postAttendanceDataStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= GET MY STAFF ATTENDANCE =================
    // builder
    //   .addCase(getMyStaffAttendance.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getMyStaffAttendance.fulfilled, (state, action) => {
    //     state.loading = false;

    //     const attendance = action.payload?.data?.staffAttendance;

    //     if (attendance && attendance.punchInTime && !attendance?.punchOutTime) {
    //       state.isPunchedIn = true;
    //       state.attendanceId = attendance.id; // ⭐ KEY LINE
    //     } else {
    //       state.isPunchedIn = false;
    //       state.attendanceId = null;
    //     }
    //   })
    //   .addCase(getMyStaffAttendance.rejected, (state) => {
    //     state.loading = false;
    //     state.isPunchedIn = false;
    //     state.attendanceId = null;
    //   });

    // ================= STAFF PUNCH IN =================
    builder
      .addCase(staffPunchIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(staffPunchIn.fulfilled, (state, action) => {
        state.loading = false;
        state.staffPunchInData = action.payload;
        // ⭐⭐ ADD THIS ⭐⭐
        state.isPunchedIn = true;
        state.attendanceId = action.payload?.data?.staffAttendance?.id || null;
      })
      .addCase(staffPunchIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ================= STAFF PUNCH OUT =================
    builder
      .addCase(staffPunchOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(staffPunchOut.fulfilled, (state, action) => {
        state.loading = false;
        state.staffPunchOutData = action.payload;
        // ⭐⭐ ADD THIS ⭐⭐
        state.isPunchedIn = false;
        state.attendanceId = null;
      })
      .addCase(staffPunchOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getStaffAttendanceID
      builder
       .addCase(getMyStaffAttendanceID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyStaffAttendanceID.fulfilled, (state, action) => {
        state.loading = false;
        state.staffData = action.payload;
      })
      .addCase(getMyStaffAttendanceID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
