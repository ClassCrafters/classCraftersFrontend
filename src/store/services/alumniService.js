import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= ADMIN ================= */

export const createAlumni = async (alumniData) => {
    const res = await axios.post(
        `${API_BASE_URL}/alumnis/alumnis`,
        alumniData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getAllAlumnis = async () => {
    const res = await axios.get(
        `${API_BASE_URL}/alumnis/alumnis`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getAlumniById = async (id) => {
    const res = await axios.get(
        `${API_BASE_URL}/alumnis/alumnis/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const updateAlumni = async (id, updates) => {
    const res = await axios.put(
        `${API_BASE_URL}/alumnis/alumnis/${id}`,
        updates,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const deleteAlumni = async (id) => {
    const res = await axios.delete(
        `${API_BASE_URL}/alumnis/alumnis/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

