import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import studentReducer from "./slices/studentSlice"
import authReducer from "./slices/authSlice";
import jitsiReducer from "./slices/jitsiSlice";
import classRoomReducer from "./slices/classRoomSlice";
import assignmentReducer from "./slices/assignmentSlice";
import paymentReducer from "./slices/paymentSlice";
import institutionReducer from "./slices/institutionSlice";
import phaseReducer from "./slices/phaseSlice";
import subGroupReducer from "./slices/subGroupSlice";
import feeStructureReducer from "./slices/feeStructureSlice";
import attendanceReducer from "./slices/attendanceSlice";
import quizReducer from "./slices/quizSlice";
import frontOfficeReducer from "./slices/frontOfficeSlice";
import timeTableReducer from "./slices/timeTableSlice";
import staffReducer from "./slices/staffSlice";
import leaveReducer from "./slices/leaveSlice";
import alumniReducer from "./slices/alumniSlice";
import libraryReducer from "./slices/librarySlice";
import inventoryReducer from "./slices/inventorySlice";
import transportReducer from "./slices/transportSlice";
import examReducer from "./slices/examSlice";
// import courseReducer from "./slices/courseSlice";

const rootReducer = combineReducers({
role: roleReducer,
user: userReducer,
classroom: classRoomReducer,
jitsi: jitsiReducer,
auth: authReducer,
student: studentReducer,
staff: staffReducer,
assignment: assignmentReducer,
payment: paymentReducer,
institution: institutionReducer,
phase: phaseReducer,
subGroup: subGroupReducer,
feeStructure: feeStructureReducer,
attendance: attendanceReducer,
quiz: quizReducer,
frontOffice: frontOfficeReducer,
timeTable: timeTableReducer,
leave: leaveReducer,
alumni: alumniReducer,
library : libraryReducer,
inventory: inventoryReducer,
transport: transportReducer,
exams: examReducer
//   course: courseReducer,
});

export default rootReducer;
