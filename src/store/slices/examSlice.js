import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as examService from "../services/examService";

/* ================== EXAMS ================== */

export const createExam = createAsyncThunk("exams/create", async (examData) => {
    return await examService.createExam(examData);
});

export const getExams = createAsyncThunk("exams/get", async () => {
    return await examService.getExams();
});

/* ================== EXAM SCHEDULE ================== */

export const createExamSchedule = createAsyncThunk(
    "examSchedule/create",
    async ({examId,scheduleData}) => {
        return await examService.createExamSchedule(examId,scheduleData);
    }
);

export const getExamSchedule = createAsyncThunk(
    "examSchedule/get",
    async () => {
        return await examService.getExamSchedule();
    }
);

/* ================== EXAM RESULTS ================== */

export const createExamResult = createAsyncThunk(
    "examResults/create",
    async ({examId,resultData}) => {
        return await examService.createExamResult(examId, resultData);
    }
);

export const getExamResults = createAsyncThunk(
    "examResults/get",
    async (examId) => {
        return await examService.getExamResults(examId);
    }
);

/* ================== SLICE ================== */

const examSlice = createSlice({
    name: "exams",
    initialState: {
        examGroups: [],
        examSchedule: [],
        examResults: [],
        selectedExamGroup: null,
        selectedExamSchedule: null,
        selectedExamResult: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        /* ===== EXAMS ===== */
        .addCase(getExams.fulfilled, (state, action) => {
            state.loading = false;
            state.examGroups = action.payload.exams;
        })

        .addCase(createExam.fulfilled, (state, action) => {
            state.loading = false;
            state.examGroups.push(action.payload);
        })

        /* ===== SCHEDULE ===== */
        .addCase(getExamSchedule.fulfilled, (state, action) => {
            state.loading = false;
            state.examSchedule = action.payload.data.schedules;
        })

        .addCase(createExamSchedule.fulfilled, (state, action) => {
            state.loading = false;
            state.examSchedule.push(action.payload);
        })

        /* ===== RESULTS ===== */
        .addCase(getExamResults.fulfilled, (state, action) => {
            state.loading = false;
            state.examResults = action.payload.results;
        })

        .addCase(createExamResult.fulfilled, (state, action) => {
            state.loading = false;
            state.examResults.push(action.payload);
        })

        /* ===== GLOBAL LOADING ===== */
        .addMatcher(
            (action) => action.type.endsWith("/pending"),
            (state) => {
                state.loading = true;
                state.error = null;
            }
        )
        .addMatcher(
            (action) => action.type.endsWith("/rejected"),
            (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
        );
    },
});

export default examSlice.reducer;