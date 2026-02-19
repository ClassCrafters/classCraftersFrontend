export const selectTransportState = (state) => state.transport;
export const selectVehicles = (state) => selectTransportState(state).vehicles;
export const selectDrivers = (state) => selectTransportState(state).drivers;
export const selectRoutes = (state) => selectTransportState(state).routes;
export const selectStudentTransports = (state) => selectTransportState(state).studentTransports;
export const selectTransportLoading = (state) => selectTransportState(state).loading;
export const selectTransportError = (state) => selectTransportState(state).error;
