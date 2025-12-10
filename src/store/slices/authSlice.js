import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../services/auth";

// ✅ LOGIN
export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);



      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ✅ SIGNUP
export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.signup(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
    loading: false,
    error: null,
    signupSuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user?.role || null;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SIGNUP
      .addCase(fetchSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.signupSuccess = false;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.signupSuccess = true;
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.signupSuccess = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
