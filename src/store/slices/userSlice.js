import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as userService from "../services/userService";

// --- Async thunks ---
export const fetchAllUser = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getAllUser();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching users");
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await userService.getUser(userId);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await userService.createUser(userData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating user");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const data = await userService.updateUser(id, updates);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error updating user");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id; // return deleted user ID
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error deleting user");
    }
  }
);

export const fetchTeacher = createAsyncThunk(
  "user/fetchTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userService.getTeacher();
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching user");
    }
  }
);

// --- Initial state ---
const initialState = {
  data: [], // 👈 should be array of users
  dataTeacher: [],
  loading: false,
  error: null,
};

// --- Slice ---
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.data = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllUser
      .addCase(fetchAllUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // full user list
      })
      .addCase(fetchAllUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUser (single user, can add to list or replace)
      .addCase(fetchUser.fulfilled, (state, action) => {
        const existing = state.data.find((u) => u.id === action.payload.id);
        if (existing) {
          Object.assign(existing, action.payload);
        } else {
          state.data.push(action.payload);
        }
      })

      // createUser
      .addCase(createUser.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // deleteUser
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter((u) => u.id !== action.payload);
      });
    builder
      .addCase(fetchTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacher.fulfilled, (state, action) => {
        state.loading = true;
        state.dataTeacher = action.payload;
      })
      .addCase(fetchTeacher.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
