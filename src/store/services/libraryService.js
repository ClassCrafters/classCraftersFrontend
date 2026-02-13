import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= ADMIN ================= */

export const createBook = async (bookData) => {
    const res = await axios.post(
        `${API_BASE_URL}/library/books`,
        bookData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getBooks = async () => {
    const res = await axios.get(
        `${API_BASE_URL}/library/books`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getBooksByStudent = async (studentId) => {
    const res = await axios.get(
        `${API_BASE_URL}/library/books/student/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    // console.log("Get Books by Student Response:", res.data);
    return res.data.data;
};

export const deleteBook = async (id) => {
    const res = await axios.delete(
        `${API_BASE_URL}/library/books/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const issueBook = async (issueData) => {
    const res = await axios.post(
        `${API_BASE_URL}/library/books/issue`,
        issueData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const returnBook = async (issueId) => {
    const res = await axios.post(
        `${API_BASE_URL}/library/books/return`,
        { issueId },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};