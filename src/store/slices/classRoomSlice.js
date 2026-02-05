import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as classroomService from "../services/classroomService";

// Create Classroom
export const createClassroom = createAsyncThunk(
    "classroom/createClassroom",
    async (classData, { rejectWithValue }) => {
        try {
            const response = await classroomService.createClassroom(classData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get Classrooms
export const getClassroom = createAsyncThunk(
    "classroom/getClassrooms",
    async (_, { rejectWithValue }) => {
        try {
            const response = await classroomService.getClassrooms();
            //   console.log("Get Classrooms Response:", response.data);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getClassroomById = createAsyncThunk(
    "classroom/getClassroomById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await classroomService.getClassroomById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update Classroom
export const updateClassroom = createAsyncThunk(
    "classroom/updateClassroom",
    async (  updates , { rejectWithValue }) => {
        console.log("Update Classroom:", updates);
        try {
            const response = await classroomService.updateClassroom(updates.id, updates);
            return response; // ✅ return updated classroom
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete Classroom
export const deleteClassroom = createAsyncThunk(
    "classroom/deleteClassroom",
    async (id, { rejectWithValue }) => {
        try {
            await classroomService.deleteClassroom(id);
            return id; // ✅ return the deleted classroom id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createSubject = createAsyncThunk(
    "classroom/createSubject",
    async ({ subjectData, classroomId }, { rejectWithValue }) => {
        try {
            const response = await classroomService.createSubject(subjectData, classroomId);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAllSubjects = createAsyncThunk(
    "classroom/getAllSubjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await classroomService.getAllSubjects();
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getSubjectById = createAsyncThunk(
    "classroom/getSubjectById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await classroomService.getSubjectById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateSubject = createAsyncThunk(
    "classroom/updateSubject",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            const response = await classroomService.updateSubject(id, updates);
            return response; // ✅ return updated subject
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteSubject = createAsyncThunk(
    "classroom/deleteSubject",
    async (id, { rejectWithValue }) => {
        try {
            await classroomService.deleteSubject(id);
            return id; // ✅ return the deleted subject id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const classroomSlice = createSlice({
    name: "classrooms",
    initialState: {
        classrooms: [],
        subject:[],
        classroom: null,
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.classrooms = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms.push(action.payload);
            })
            .addCase(createClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = Array.isArray(action.payload.classrooms)
                    ? action.payload.classrooms
                    : [];
            })

            .addCase(getClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(getClassroomById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getClassroomById.fulfilled, (state, action) => {
                state.loading = false;
                state.classroom = action.payload;
            })
            .addCase(getClassroomById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = state.classrooms.map((cls) =>
                    cls.id === action.payload.id ? action.payload : cls
                );
            })
            .addCase(updateClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteClassroom.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClassroom.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = state.classrooms.filter(
                    (cls) => cls.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteClassroom.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create Subject
        builder
            .addCase(createSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subject.push(action.payload);
            })
            .addCase(createSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get All Subjects
        builder
            .addCase(getAllSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subject = Array.isArray(action.payload.subjects)
                    ? action.payload.subjects
                    : [];
            })

            .addCase(getAllSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get Subject by ID
        builder
            .addCase(getSubjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSubjectById.fulfilled, (state, action) => {
                state.loading = false;
                state.subject = action.payload;
            })
            .addCase(getSubjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subject = state.subject.map((subject) =>
                    subject.id === action.payload.id ? action.payload : subject
                );
            })
            .addCase(updateSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteSubject.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSubject.fulfilled, (state, action) => {
                state.loading = false;
                state.subject = state.subject.filter(
                    (subject) => subject.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteSubject.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = classroomSlice.actions;
export default classroomSlice.reducer;
