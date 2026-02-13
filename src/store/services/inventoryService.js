import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= ADMIN ================= */

export const createInventory = async (inventoryData) => {
    const res = await axios.post(
        `${API_BASE_URL}/inventory/inventories`,
        inventoryData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getInventories = async () => {
    const res = await axios.get(
        `${API_BASE_URL}/inventory/inventories`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    // console.log("API Response for getInventories:", res.data);
    return res.data.inventories;
};

export const getInventoryById = async (id) => {
    const res = await axios.get(
        `${API_BASE_URL}/inventory/inventories/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const updateInventory = async (id, updates) => {
    const res = await axios.put(
        `${API_BASE_URL}/inventory/inventories/${id}`,
        updates,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const deleteInventory = async (id) => {
    const res = await axios.delete(
        `${API_BASE_URL}/inventory/inventories/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const allocateInventory = async (id, updates) => {
    const res = await axios.post(
        `${API_BASE_URL}/inventory/inventories/${id}/allocate`,
        updates,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};