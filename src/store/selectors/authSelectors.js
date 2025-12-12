export const selectAuth = (state) => state.auth.data;
export const selectAuthRole = (state) => state.auth.data.user.role;

export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
