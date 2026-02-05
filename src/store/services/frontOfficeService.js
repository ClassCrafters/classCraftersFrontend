import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL;


export const createEnquiry = async (enquiryData) => {
    const res = await axios.post(
        `${API_URL}/enquiries/createEnquiry`,
        enquiryData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getAllEnquiries = async () => {
    const res = await axios.get(
        `${API_URL}/enquiries/enquiries`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;

};

export const getEnquiryByFilter = async (filter) => {
    const res = await axios.get(
        `${API_URL}/enquiries/enquiries/filter`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: filter
        }
    );
        console.log("Get All Enquiries Response:", res.data);

    return res.data.data;
};



export const createVisitorEntry = async (visitorData) => {
    const res = await axios.post(
        `${API_URL}/visitorBook/createVisitor`,
        visitorData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getAllVisitorEntries = async () => {
    const res = await axios.get(
        `${API_URL}/visitorBook/getVisitor`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}
export const getvisitorTodayEntries = async () => {
    const res = await axios.get(
        `${API_URL}/visitorBook/visitorToday`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getActiveVisitorEntries = async () => {
    const res = await axios.get(
        `${API_URL}/visitorBook/visitorActive`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,

            },
        }
    );
    return res.data;
}
export const exitVisitorEntry = async (visitorId, exitData) => {
    const res = await axios.patch(
        `${API_URL}/visitorBook/${visitorId}/exit`,
        exitData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const createDispatch = async (dispatchData) => {
    const res = await axios.post(
        `${API_URL}/dispatches/createDispatch`,
        dispatchData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getAllDispatches = async () => {
    const res = await axios.get(
        `${API_URL}/dispatches/getDispatch`,  
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getDispatchById = async (dispatchId) => {
    const res = await axios.get(
        `${API_URL}/dispatches/getDispatch/${dispatchId}`,  
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const updateDispatch = async (dispatchId, updateData) => {
    const res = await axios.put(
        `${API_URL}/dispatches/updateDispatch/${dispatchId}`,
        updateData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const deleteDispatch = async (dispatchId) => {
    const res = await axios.delete(
        `${API_URL}/dispatches/deleteDispatch/${dispatchId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const createReceivePostal = async (receiveData) => {
    const res = await axios.post(
        `${API_URL}/receivePostals/createReceivePostal`,
        receiveData,
        {
            headers: {  
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}
export const getAllReceivePostals = async () => {
    const res = await axios.get(
        `${API_URL}/receivePostals/getReceivePostals`,   
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getReceivePostalById = async (receiveId) => {
    const res = await axios.get(
        `${API_URL}/receivePostals/getReceivePostals/${receiveId}`,   
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const updateReceivePostal = async (receiveId, updateData) => {
    const res = await axios.put(
        `${API_URL}/receivePostals/updateReceivePostal/${receiveId}`,
        updateData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}
export const deleteReceivePostal = async (receiveId) => {
    const res = await axios.delete(
        `${API_URL}/receivePostals/deleteReceivePostal/${receiveId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const createComplaint = async (complaintData) => {
    const res = await axios.post(
        `${API_URL}/complains/createComplain`,
        complaintData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}
export const getComplaints = async () => {
    const res = await axios.get(
        `${API_URL}/complains/getComplains`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const getComplaintById = async (complaintId) => {
    const res = await axios.get(
        `${API_URL}/complains/getComplain/${complaintId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const updateComplaint = async (dispatchId, updateData) => {
    const res = await axios.put(
        `${API_URL}/complains/updateComplain/${dispatchId}`,
        updateData,
        {
            headers: {  
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}

export const deleteComplaint = async (complaintId) => {
    const res = await axios.delete(
        `${API_URL}/complains/deleteComplain/${complaintId}`,
        {
            headers: {  
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
}