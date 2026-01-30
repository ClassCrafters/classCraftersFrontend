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
// import courseReducer from "./slices/courseSlice";

const rootReducer = combineReducers({
role: roleReducer,
user: userReducer,
classroom: classRoomReducer,
jitsi: jitsiReducer,
auth: authReducer,
student: studentReducer,
assignment: assignmentReducer,
payment: paymentReducer,
institution: institutionReducer,
phase: phaseReducer,
subGroup: subGroupReducer,
feeStructure: feeStructureReducer,
attendance: attendanceReducer,
quiz: quizReducer,
frontOffice: frontOfficeReducer,
//   course: courseReducer,
});

export default rootReducer;
