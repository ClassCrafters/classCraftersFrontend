// src/store/selectors/studentSelectors.js

// Get the whole student slice
export const selectStudentState = (state) => state.student;

// Get list of students
export const selectStudents = (state) => state.student.list || [];

//get filterlist of students
export const selectStudentsFilter = (state) => state.student.filterlist || [];

//get listById of students
export const selectStudentsByid = (state) => state.student.listById || [];


// Get loading status
export const selectStudentsLoading = (state) => state.student.loading;

// Get error if any
export const selectStudentsError = (state) => state.student.error;

// Get student by ID
export const selectStudentById = (id) => (state) =>
  state.student.list.find((student) => student.id === id);
