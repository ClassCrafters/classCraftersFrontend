import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import * as frontOfficeService from "../services/frontOfficeService";

// Create Enquiry
export const createEnquiry = createAsyncThunk(
  "frontOffice/createEnquiry",
  async (enquiryData, { rejectWithValue }) => { 
    try {
      const response = await frontOfficeService.createEnquiry(enquiryData);
      console.log("Create Enquiry Response:", response);
      return response;
    } catch (error) {
      console.error("Create Enquiry Error:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to create enquiry" });
    }   
  }
);


// Get All Enquiries
export const getAllEnquiries = createAsyncThunk(
  "frontOffice/getAllEnquiries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await frontOfficeService.getAllEnquiries();
      return response;
    }
    catch (error) {
      return rejectWithValue(error.response.data);
    }
    }
);

// Get Enquiries by Filter
export const getEnquiryByFilter = createAsyncThunk(
    "frontOffice/getEnquiryByFilter",
    async (filter, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getEnquiryByFilter(filter);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const frontOfficeSlice = createSlice({
  name: "frontOffice",
  initialState: {   
    enquiries: [],
    loading: false,
    error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Create Enquiry
        builder.addCase(createEnquiry.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createEnquiry.fulfilled, (state, action) => {
            state.loading = false;
            state.enquiries.push(action.payload);
        })
        .addCase(createEnquiry.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // Get All Enquiries
        .addCase(getAllEnquiries.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(getAllEnquiries.fulfilled, (state, action) => {
            state.loading = false;
            console.log("Get All Enquiries payload:", action.payload);
            // Backend returns { success: true, data: enquiries }
            state.enquiries = Array.isArray(action.payload?.data)
                    ? action.payload.data
                    : Array.isArray(action.payload)
                    ? action.payload
                    : [];
        })
        .addCase(getAllEnquiries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Get Enquiries by Filter
        .addCase(getEnquiryByFilter.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getEnquiryByFilter.fulfilled, (state, action) => {
            state.loading = false;
            state.enquiries = action.payload;
        })
        .addCase(getEnquiryByFilter.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default frontOfficeSlice.reducer;
