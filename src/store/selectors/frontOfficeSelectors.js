// Enquiry Selectors
export const selectEnquiries = (state) => state.frontOffice.enquiries;
export const selectEnquiryLoading = (state) => state.frontOffice.loading;
export const selectEnquiryError = (state) => state.frontOffice.error;

// Visitor Book Selectors
export const selectVisitorBook = (state) => state.frontOffice.visitorBook;
export const selectVisitorBookLoading = (state) => state.frontOffice.loading;
export const selectVisitorBookError = (state) => state.frontOffice.error;

// Dispatch Selectors
export const selectDispatchPostal = (state) => state.frontOffice.dispatchPostal;
export const selectDispatchLoading = (state) => state.frontOffice.loading;
export const selectDispatchError = (state) => state.frontOffice.error;

// Receive Postal Selectors
export const selectReceivePostal = (state) => state.frontOffice.receivePostal;
export const selectReceivePostalLoading = (state) => state.frontOffice.loading;
export const selectReceivePostalError = (state) => state.frontOffice.error;

// Complaint Selectors
export const selectComplaints = (state) => state.frontOffice.complaints;
export const selectComplaintLoading = (state) => state.frontOffice.loading;
export const selectComplaintError = (state) => state.frontOffice.error;

// General Selectors
export const selectFrontOfficeLoading = (state) => state.frontOffice.loading;
export const selectFrontOfficeError = (state) => state.frontOffice.error;