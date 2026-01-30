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

export const postAttendanceDataStudents = async (attendanceData) => {
  const response = await axios.post(`${API_URL}/attendance/recordStudentAttendance`, attendanceData, {
    headers: {  
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

// export const staffPunchIn = async (data) => {
//   const res = await axios.post(
//     `${API_URL}/attendance/staffPunchIn`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//   return res.data;
// };

// export const staffPunchOut= async (data) => {
//   const res = await axios.post(
//     `${API_URL}/attendance/staffPunchout`,
//     data,
//     {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }
//   );
//   return res.data;
// };

// ================= STAFF PUNCH IN =================
export const staffPunchIn = async (payload) => {
  const res = await axios.post(
    `${API_URL}/attendance/staffPunchIn`,
    {
      staffRegId: payload.staffRegId,
      institutionId: payload.institutionId,
      remarks: payload.remarks || "Null",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

// ================= STAFF PUNCH OUT =================
export const staffPunchOut = async (payload) => {
  const res = await axios.post(
    `${API_URL}/attendance/staffPunchout`,
    {
      staffAttendance_id: payload.staffAttendance_id,
      remarks: payload.remarks || "kuch_ni",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res.data;
};

