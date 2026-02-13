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

export const issueBook = async (studentId, bookId, dueDate) => {
    const res = await axios.post(
        `${API_BASE_URL}/library/books/issue`,
        { studentId, bookId, dueDate },
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