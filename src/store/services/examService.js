import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // adjust if your backend URL differs

export const createExam = async (examData) => {
    const res = await axios.post(`${API_BASE_URL}/exams`, examData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
  };
// Fetch all exams
export const getExams = async () => {
  const res = await axios.get(`${API_BASE_URL}/exams`,{
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
  },
  }
);
  return res.data;
};

export const getExamsById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/exams/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

// Update exam
export const updateExam = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/exams/${id}`, data,{
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
  });
  return res.data;
};

// Delete exam
export const deleteExam = async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/exams/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

//add subject to exam
export const addSubjectToExam = async (examId, data) => {
    const res = await axios.post(`${API_BASE_URL}/exams/${examId}/subjects`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

//add result to exam
export const addRecordToExam = async (examId, data) => {
    const res = await axios.post(`${API_BASE_URL}/exams/${examId}/results`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

//get subjects of exam
export const getRecordsOfExam = async (examId) => {
    const res = await axios.get(`${API_BASE_URL}/exams/${examId}/results`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};

// convenience wrappers matching slice naming
export const createExamResult = async (examId, data) => {
    // delegate to addRecordToExam for backwards compatibility
    return await addRecordToExam(examId, data);
};

export const getExamResults = async (examId) => {
    return await getRecordsOfExam(examId);
};

// ===== exam schedule =====
export const createExamSchedule = async (examId, scheduleData) => {
    // the backend may expect examId in path or body; include both
    const res = await axios.post(
        `${API_BASE_URL}/exams/${examId}/subjects`,
        { examId, ...scheduleData },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return res.data;
};

export const getExamSchedule = async (examId) => {
    // if examId provided, fetch schedules for that exam; else return all
    const url = examId
        ? `${API_BASE_URL}/exams/${examId}/schedules`
        : `${API_BASE_URL}/exams/schedules`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data;
};