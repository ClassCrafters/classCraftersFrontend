export const selectStaffPunchOutData = (state) =>
  state.attendance.staffPunchOutData;
export const selectAttendanceLoading = (state) =>
  state.attendance.loading;

export const selectAttendanceError = (state) =>
  state.attendance.error;