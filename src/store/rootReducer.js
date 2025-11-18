import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import roleReducer from "./slices/roleSlice";
import studentReducer from "./slices/studentSlice"
import authReducer from "./slices/authSlice";
import jitsiReducer from "./slices/jitsiSlice";
import classRoomReducer from "./slices/classRoomSlice";
import assignmentReducer from "./slices/assignmentSlice";
import paymentReducer from "./slices/paymentSlice";
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
//   course: courseReducer,
});

export default rootReducer;
