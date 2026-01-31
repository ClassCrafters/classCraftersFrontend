import axios from "axios";

// ✅ For Vite
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ For CRA
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllUser = async () => {
  const res = await axios.get(`${API_BASE_URL}/users`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


  return res.data;
};
export const getUser = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/users/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/users`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }, userData);
  return res.data;
};

export const updateUser = async (id, updates) => {
  const res = await axios.put(`${API_BASE_URL}/users/${id}`,updates,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE_URL}/users/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTeacher = async () => {
 const res = await axios.get(`${API_BASE_URL}/users/teacher`,{ 
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("data from teacher service",res)
  return res.data;
};