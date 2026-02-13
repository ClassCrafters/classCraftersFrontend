import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as inventoryService from "../services/inventoryService";

// Create Inventory
export const createInventory = createAsyncThunk(
    "inventory/createInventory",
    async (inventoryData, { rejectWithValue }) => {
        try {
            const response = await inventoryService.createInventory(inventoryData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get All Inventories
export const getInventories = createAsyncThunk(
    "inventory/getInventories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await inventoryService.getInventories();
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Get Inventory by ID
export const getInventoryById = createAsyncThunk(
    "inventory/getInventoryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await inventoryService.getInventoryById(id);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update Inventory
export const updateInventory = createAsyncThunk(
    "inventory/updateInventory",
    async (  updates , { rejectWithValue }) => {
        console.log("Update Inventory:", updates);
        try {
            const response = await inventoryService.updateInventory(updates.id, updates);
            return response; // ✅ return updated inventory
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete Inventory
export const deleteInventory = createAsyncThunk(
    "inventory/deleteInventory",
    async (id, { rejectWithValue }) => {
        try {
            await inventoryService.deleteInventory(id);
            return id; // ✅ return the deleted inventory id
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Allocate Inventory
export const allocateInventory = createAsyncThunk(
    "inventory/allocateInventory",
    async (inventoryData, { rejectWithValue }) => {
        try {
            const response = await inventoryService.allocateInventory(inventoryData.inventoryId, inventoryData);
            return response; // ✅ return actual data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const inventorySlice = createSlice({
    name: "inventory",
    initialState: {
        inventory: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetState: (state) => {
            state.inventory = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder
            .addCase(createInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createInventory.fulfilled, (state, action) => {
                state.loading = false;
                const created = action.payload?.inventory || action.payload?.data || action.payload;
                if (created) state.inventory.push(created);
            })
            .addCase(createInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get
        builder
            .addCase(getInventories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInventories.fulfilled, (state, action) => {
                state.loading = false;
                const payload = action.payload || {};
                let inventories = [];
                if (Array.isArray(payload.inventories)) inventories = payload.inventories;
                else if (Array.isArray(payload.data)) inventories = payload.data;
                else if (Array.isArray(payload)) inventories = payload;
                state.inventory = inventories;
            })

            .addCase(getInventories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Get by ID
        builder
            .addCase(getInventoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getInventoryById.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(getInventoryById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // Update
        builder
            .addCase(updateInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInventory.fulfilled, (state, action) => {
                state.loading = false;
                const updated = action.payload?.inventory || action.payload?.data || action.payload;
                if (updated && updated.id) {
                    state.inventory = state.inventory.map((inventory) =>
                        inventory.id === updated.id ? updated : inventory
                    );
                } else if (action.payload && action.payload.id) {
                    state.inventory = state.inventory.map((inventory) =>
                        inventory.id === action.payload.id ? action.payload : inventory
                    );
                }
            })
            .addCase(updateInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete
        builder
            .addCase(deleteInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = state.inventory.filter(
                    (inventory) => inventory.id !== action.payload
                ); // ✅ use payload directly (id)
            })
            .addCase(deleteInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Allocate
        builder
            .addCase(allocateInventory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(allocateInventory.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(allocateInventory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetState } = inventorySlice.actions;   
export default inventorySlice.reducer;