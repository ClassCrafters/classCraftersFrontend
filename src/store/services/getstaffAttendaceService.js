
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL ;

export const getMyPunchInAttendance = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/attendance/getMyPunchInAttendance`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );


    return response.data.data.staffAttendance;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

