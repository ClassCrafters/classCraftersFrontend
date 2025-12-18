import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAttendanceDataByDate = async (date) => {
  const response = await axios.get(`${API_URL}/attendance/getStudentAttendance`, {
    params: { date },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}