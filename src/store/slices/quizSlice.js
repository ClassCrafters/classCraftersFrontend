import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as quizService from "../services/quizService";

export const createQuiz = createAsyncThunk(
    "quiz/createQuiz",
    async (quizData, { rejectWithValue }) => {
        try {
            const response = await quizService.createQuiz(quizData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addQuestion = createAsyncThunk(
    "quiz/addQuestion",
    async ({ quizId, questionData }, { rejectWithValue }) => {
        try {
            const response = await quizService.addQuestion(quizId, questionData);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const publishQuiz = createAsyncThunk(
    "quiz/publishQuiz",
    async (quizId, { rejectWithValue }) => {
        try {
            const response = await quizService.publishQuiz(quizId);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getQuiz = createAsyncThunk(
    "quiz/getQuiz",
    async ({ quizId, token }, { rejectWithValue }) => {
        try {
            const response = await quizService.getQuiz(quizId, token);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const startQuiz = createAsyncThunk(
    "quiz/startQuiz",
    async ({ quizId, token }, { rejectWithValue }) => {
        try {
            const response = await quizService.startQuiz(quizId, token);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const submitQuiz = createAsyncThunk(
    "quiz/submitQuiz",
    async ({ attemptId, answers, token }, { rejectWithValue }) => {
        try {
            const response = await quizService.submitQuiz(attemptId, answers, token);

            return response;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const quizSlice = createSlice({
    name: "quiz",
    initialState: {
        data: null,
        loading: false,
        error: null,
        attemptId: null,
        result: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(addQuestion.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(publishQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publishQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(publishQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(startQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.attemptId = action.payload;
            })
            .addCase(startQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(submitQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(submitQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
});
export default quizSlice.reducer;