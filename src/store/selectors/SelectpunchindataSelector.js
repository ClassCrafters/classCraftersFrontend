export const selectStaffPunchInData = (state) =>
  state.attendance.staffPunchInData;
export const selectAttendanceLoading = (state) =>
  state.attendance.loading;

export const selectAttendanceError = (state) =>
  state.attendance.error;