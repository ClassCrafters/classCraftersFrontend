import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= ADMIN ================= */

export const applyLeave = async (leaveData) => {
    const res = await axios.post(`${API_BASE_URL}/leave/applyLeave`, leaveData,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }
    );
    return res.data;
};
export const getMyLeaves = async () => {
    const res = await axios.get(`${API_BASE_URL}/leave/getMyLeaves`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

export const getAllLeaves = async () => {
    const res = await axios.get(`${API_BASE_URL}/leave/getAllLeaves`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

export const reviewLeave = async (leaveId, status) => {
    console.log("Reviewing leave with ID:", leaveId);
    const res = await axios.put(`${API_BASE_URL}/leave/reviewLeave/${leaveId}`, {
        status,
        remarks: "Reviewed by admin",
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

export const cancelLeave = async (id) => {
    const res = await axios.put(`${API_BASE_URL}/leave/cancelLeave/${id}`, {
        status: "CANCELLED",
        remarks: "Cancelled by admin",
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};