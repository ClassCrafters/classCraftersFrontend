import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as transportService from "../services/transportService";

export const createVehicle = createAsyncThunk(
    "transport/createVehicle",
    async (vehicle) => {
        const response = await transportService.createVehicle(vehicle);
        return response;
    }
);

export const getVehicles = createAsyncThunk(
    "transport/getVehicles",
    async () => {
        const response = await transportService.getVehicles();
        return response;
    }
);

export const updateVehicle = createAsyncThunk(
    "transport/updateVehicle",
    async (vehicle) => {
        const response = await transportService.updateVehicle(vehicle.id, vehicle);
        return response;
    }
);

export const deleteVehicle = createAsyncThunk(
    "transport/deleteVehicle",
    async (id) => {
        const response = await transportService.deleteVehicle(id);
        return response;
    }
);

export const createDriver = createAsyncThunk(
    "transport/createDriver",
    async (driver) => {
        const response = await transportService.createDriver(driver);
        return response;
    }
);

export const getDrivers = createAsyncThunk(
    "transport/getDrivers",
    async () => {
        const response = await transportService.getDrivers();
        return response;
    }
);

export const createRoute = createAsyncThunk(
    "transport/createRoute",
    async (route) => {
        const response = await transportService.createRoute(route);
        return response;
    }
);

export const getRoutes = createAsyncThunk(
    "transport/getRoutes",
    async () => {
        const response = await transportService.getRoutes();
        return response;
    }
);

export const addStop = createAsyncThunk(
    "transport/addStop",
    async (stop) => {
        const response = await transportService.addStop(stop);
        return response;
    }
);

export const assignStudentTransport = createAsyncThunk(
    "transport/assignStudentTransport",
    async (studentTransport) => {
        const response = await transportService.assignStudentTransport(studentTransport);
        return response;
    }
);

export const getStudentTransport = createAsyncThunk(
    "transport/getStudentTransport",
    async () => {
        const response = await transportService.getStudentTransport();
        return response;
    }
);

const transportSlice = createSlice({
    name: "transport",
    initialState: {
        vehicles: [],
        drivers: [],
        routes: [],
        studentTransports: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createVehicle.fulfilled, (state, action) => {
                state.vehicles.push(action.payload.data);
            })
            .addCase(getVehicles.fulfilled, (state, action) => {
                state.vehicles = action.payload.data;
            })
            .addCase(updateVehicle.fulfilled, (state, action) => {
                const vehicle = state.vehicles.find((vehicle) => vehicle.id === action.meta.arg.id);
                vehicle.vehicleNumber = action.payload.vehicleNumber;
                vehicle.type = action.payload.type;
                vehicle.capacity = action.payload.capacity;
                vehicle.model = action.payload.model;
                vehicle.insuranceNumber = action.payload.insuranceNumber;
                vehicle.insuranceExpiry = action.payload.insuranceExpiry;
                vehicle.fitnessExpiry = action.payload.fitnessExpiry;
            })
            .addCase(deleteVehicle.fulfilled, (state, action) => {
                state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.meta.arg.id);
            })
            .addCase(createDriver.fulfilled, (state, action) => {
                state.drivers.push(action.payload.data);
            })
            .addCase(getDrivers.fulfilled, (state, action) => {
                state.drivers = action.payload.data;
            })
            .addCase(createRoute.fulfilled, (state, action) => {
                state.routes.push(action.payload.data);
            })
            .addCase(getRoutes.fulfilled, (state, action) => {
                state.routes = action.payload.data;
            })
            .addCase(addStop.fulfilled, (state, action) => {

                const route = state.routes.find(
                    (route) => route.id === action.meta.arg.routeId
                );

                if (route) {
                    if (!route.stops) route.stops = [];
                    route.stops.push(action.payload.data);
                }

            })

            .addCase(assignStudentTransport.fulfilled, (state, action) => {
                state.studentTransports.push(action.payload.data);
            })
            .addCase(getStudentTransport.fulfilled, (state, action) => {
                state.studentTransports = action.payload.data;
            });
    },
});

export default transportSlice.reducer;