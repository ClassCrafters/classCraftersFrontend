import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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


// visitor book related thunks can be added here similarly
export const createVisitorEntry = createAsyncThunk(
    "frontOffice/createVisitorEntry",
    async (visitorData, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.createVisitorEntry(visitorData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create visitor entry" });
        }
    }
);

export const getAllVisitorEntries = createAsyncThunk(
    "frontOffice/getAllVisitorEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getAllVisitorEntries();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch visitor entries" });
        }
    }
);


export const getActiveVisitorEntries = createAsyncThunk(
    "frontOffice/getActiveVisitorEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getActiveVisitorEntries();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch active visitor entries" });
        }
    }
);

export const getvisitorTodayEntries = createAsyncThunk(
    "frontOffice/getvisitorTodayEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getvisitorTodayEntries();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch today's visitor entries" });
        }
    }
);

export const visitorExit = createAsyncThunk(
    "frontOffice/visitorExit",
    async (visitorId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.exitVisitorEntry(visitorId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to exit visitor" });
        }
    }
);

export const createDispatchEntry = createAsyncThunk(
    "frontOffice/createDispatchEntry",
    async (dispatchData, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.createDispatch(dispatchData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create dispatch entry" });
        }
    }
);

export const getAllDispatchEntries = createAsyncThunk(
    "frontOffice/getAllDispatchEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getAllDispatches();
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch dispatch entries" });
        }
    }
);

export const getDispatchById = createAsyncThunk(
    "frontOffice/getDispatchById",
    async (dispatchId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getDispatchById(dispatchId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch dispatch entry" });
        }
    }
);

export const updateDispatchEntry = createAsyncThunk(
    "frontOffice/updateDispatchEntry",
    async ({ dispatchId, updateData }, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.updateDispatch(dispatchId, updateData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update dispatch entry" });
        }
    }
);

export const deleteDispatchEntry = createAsyncThunk(
    "frontOffice/deleteDispatchEntry",
    async (dispatchId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.deleteDispatch(dispatchId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete dispatch entry" });
        }
    }
);

export const createReceivePostalEntry = createAsyncThunk(
    "frontOffice/createReceivePostalEntry",
    async (receivePostalData, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.createReceivePostal(receivePostalData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create receive postal entry" });
        }
    }
);

export const getAllReceivePostalEntries = createAsyncThunk(
    "frontOffice/getAllReceivePostalEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getAllReceivePostals();
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch receive postal entries" });
        }
    }
);

export const getReceivePostalById = createAsyncThunk(
    "frontOffice/getReceivePostalById",
    async (receiveId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getReceivePostalById(receiveId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch receive postal entry" });
        }
    }
);

export const updateReceivePostalEntry = createAsyncThunk(
    "frontOffice/updateReceivePostalEntry",
    async ({ dispatchId, updateData }, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.updateReceivePostal(dispatchId, updateData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update receive postal entry" });
        }
    }
);

export const deleteReceivePostalEntry = createAsyncThunk(
    "frontOffice/deleteReceivePostalEntry",
    async (receiveId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.deleteReceivePostal(receiveId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete receive postal entry" });
        }
    }
);

export const createComplaintEntry = createAsyncThunk(
    "frontOffice/createComplaintEntry",
    async (complaintData, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.createComplaint(complaintData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to create complaint entry" });
        }
    }
);

export const getAllComplaintEntries = createAsyncThunk(
    "frontOffice/getAllComplaintEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getComplaints();
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch complaint entries" });
        }
    }
);

export const getComplaintById = createAsyncThunk(
    "frontOffice/getComplaintById",
    async (complaintId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.getComplaintById(complaintId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch complaint entry" });
        }
    }
);

export const updateComplaintEntry = createAsyncThunk(
    "frontOffice/updateComplaintEntry",
    async ({ dispatchId, updateData }, { rejectWithValue }) => {

        try {
            const response = await frontOfficeService.updateComplaint(dispatchId, updateData);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to update complaint entry" });
        }
    }
);

export const deleteComplaintEntry = createAsyncThunk(
    "frontOffice/deleteComplaintEntry",
    async (complaintId, { rejectWithValue }) => {
        try {
            const response = await frontOfficeService.deleteComplaint(complaintId);
            return response;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to delete complaint entry" });
        }
    }
);



const frontOfficeSlice = createSlice({
    name: "frontOffice",
    initialState: {
        enquiries: [],
        visitorBook: [],
        dispatchPostal: [],
        receivePostal: [],
        complaints: [],
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

        // Visitor Book related reducers
        builder
            .addCase(createVisitorEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVisitorEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.visitorBook = action.payload.visitorBook;
            })
            .addCase(createVisitorEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }
            )
            .addCase(getAllVisitorEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllVisitorEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.visitorBook = action.payload;
            })
            .addCase(getAllVisitorEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getActiveVisitorEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(getActiveVisitorEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.visitorBook = action.payload;
            }
            )
            .addCase(getActiveVisitorEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getvisitorTodayEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(getvisitorTodayEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.visitorBook = action.payload;
            }
            )
            .addCase(getvisitorTodayEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(visitorExit.pending, (state) => {
                state.loading = true;
                state.error = null;
            }
            )
            .addCase(visitorExit.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.visitorBook.findIndex(visitor => visitor.id === action.payload.id);
                if (index !== -1) {
                    state.visitorBook[index] = action.payload;
                }
            }
            )
            .addCase(visitorExit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder.addCase(createDispatchEntry.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createDispatchEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.dispatchPostal.push(action.payload);
            })
            .addCase(createDispatchEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllDispatchEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDispatchEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.dispatchPostal = action.payload?.data || action.payload;
            })
            .addCase(getAllDispatchEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getDispatchById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDispatchById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getDispatchById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateDispatchEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDispatchEntry.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.dispatchPostal.findIndex(dispatch => dispatch.id === action.payload.id);
                if (index !== -1) {
                    state.dispatchPostal[index] = action.payload;
                }
            })
            .addCase(updateDispatchEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteDispatchEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDispatchEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.dispatchPostal = state.dispatchPostal.filter(dispatch => dispatch.id !== action.payload.id);
            })
            .addCase(deleteDispatchEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Receive Postal
            .addCase(createReceivePostalEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createReceivePostalEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.receivePostal.push(action.payload);
            })
            .addCase(createReceivePostalEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllReceivePostalEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllReceivePostalEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.receivePostal = action.payload?.data || action.payload;
            })
            .addCase(getAllReceivePostalEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getReceivePostalById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getReceivePostalById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getReceivePostalById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateReceivePostalEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReceivePostalEntry.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.receivePostal.findIndex(receive => receive.id === action.payload.id);
                if (index !== -1) {
                    state.receivePostal[index] = action.payload;
                }
            })
            .addCase(updateReceivePostalEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteReceivePostalEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteReceivePostalEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.receivePostal = state.receivePostal.filter(receive => receive.id !== action.payload.id);
            })

         
            .addCase(deleteReceivePostalEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Complaints
            .addCase(createComplaintEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComplaintEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints.push(action.payload);
            })
            .addCase(createComplaintEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllComplaintEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllComplaintEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload?.data || action.payload;
            })
            .addCase(getAllComplaintEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getComplaintById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getComplaintById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getComplaintById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateComplaintEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComplaintEntry.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.complaints.findIndex(complaint => complaint.id === action.payload.id);
                if (index !== -1) {
                    state.complaints[index] = action.payload;
                }
            })
            .addCase(updateComplaintEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteComplaintEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComplaintEntry.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = state.complaints.filter(complaint => complaint.id !== action.payload.id);
            })
            .addCase(deleteComplaintEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default frontOfficeSlice.reducer;
