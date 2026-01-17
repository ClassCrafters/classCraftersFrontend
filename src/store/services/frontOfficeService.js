import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE_URL ;


export const createEnquiry = async (enquiryData) => {
    const res = await axios.post(
        `${API_URL}/enquiries`,
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
        `${API_URL}/enquiries`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    // console.log("Get All Enquiries Response:", res.data);
    return res.data;

};

export const getEnquiryByFilter = async (filter) => {
    const res = await axios.get(
        `${API_URL}/enquiries/filter`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: filter
        }
    );
    return res.data.enquiries;
};

