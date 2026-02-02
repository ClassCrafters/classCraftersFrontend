import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as studentService from "../services/studentService";

export const fetchStudents = createAsyncThunk("students/fetch", async () => {
  return await studentService.getStudents();
});

export const fetchStudentsFilter = createAsyncThunk("students/fetchFilter", async () => {
  return await studentService.getStudentsByFilter();
});


export const fetchStudentsById = createAsyncThunk("students/fetchById", async (id) => {
  console.log("id from students slice", id)

  return await studentService.getStudentsById(id);

});


export const addStudent = createAsyncThunk("students/add", async (student) => {
  return await studentService.createStudent(student);

});


export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ id, data }) => {
    return await studentService.updateStudent(id, data);
  }
);

export const deleteStudent = createAsyncThunk("students/delete", async (id) => {
  await studentService.deleteStudent(id);
  return id; // return only id for removing from state
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    filterlist: [],
    listById: [],
    selectedStudent: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.list = action.payload.data.registrations;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const idx = state.list.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter((s) => s.id !== action.payload);
      })
    builder
      .addCase(fetchStudentsFilter.fulfilled, (state, action) => {
        state.filterlist = action.payload.data.registrations;
      })

      .addCase(fetchStudentsById.fulfilled, (state, action) => {
        state.selectedStudent = action.payload.data.registration;
      });
    ;
  },
});

export default studentSlice.reducer;
