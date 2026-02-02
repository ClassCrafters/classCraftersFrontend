import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const createFeeStructure = async (feeData) => {
    const response = await axios.post(`${API_URL}/fee-structures`, feeData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const getFeeStructures = async () => {
    const response = await axios.get(`${API_URL}/fee-structures`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeHead = async (structureId, heads) => {
    const response = await axios.post(`${API_URL}/fee-structures/2/heads`, {heads:heads},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeInstallment = async (structureId, installments) => {
    const response = await axios.post(`${API_URL}/fee-structures/2/installments`, {installments:installments},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFeeDiscount = async (structureId, discounts) => {
    const response = await axios.post(`${API_URL}/fee-structures/2/discounts`, {discounts:discounts},

        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

export const createFineRule = async (structureId, fineData) => {
    const response = await axios.post(`${API_URL}/fee-structures/${structureId}/fine-rules`, fineData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
}

