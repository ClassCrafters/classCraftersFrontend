import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* ================= ADMIN ================= */

export const createQuiz = async (quizData) => {
    const res = await axios.post(
        `${API_BASE_URL}/quizzes`,
        quizData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const addQuestion = async (quizId, questionData) => {
    const res = await axios.post(
        `${API_BASE_URL}/quizzes/${quizId}/questions`,
        questionData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const publishQuiz = async (quizId) => {
    const res = await axios.patch(
        `${API_BASE_URL}/quizzes/${quizId}/publish`,
        {}, // ✅ EMPTY BODY
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

/* ================= STUDENT ================= */

export const getQuiz = async (quizId) => {
    const res = await axios.get(
        `${API_BASE_URL}/quizzes/${quizId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    //   console.log("Quiz Service Response:", res.data.quiz);
    return res.data.quiz;
};

export const startQuiz = async (quizId) => {
    const res = await axios.post(
        `${API_BASE_URL}/quizzes/${quizId}/start`,
        {}, // ✅ EMPTY BODY
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data.attemptId;
};

export const submitQuiz = async (attemptId, answers) => {
    console.log("Submitting Quiz from Service - Attempt ID:", attemptId);
    console.log("Answers Payload:", answers);

    const res = await axios.post(
        `${API_BASE_URL}/quizzes/submit/${attemptId}`,
        { answers: answers },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};
