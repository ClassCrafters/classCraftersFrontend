import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createVehicle = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transport/vehicle`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating vehicle:", error.message);
    return error.response.data;
  }
};

export const getVehicles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transport/vehicle`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting vehicles:", error.message);
    return error.response.data;
  }
};

export const updateVehicle = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/transport/vehicle/${id}`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating vehicle:", error.message);
    return error.response.data;
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/transport/vehicle/${id}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting vehicle:", error.message);
    return error.response.data;
  }
};

export const createDriver = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transport/driver`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating driver:", error.message);
    return error.response.data;
  }
};

export const getDrivers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transport/driver`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting drivers:", error.message);
    return error.response.data;
  }
};

export const createRoute = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transport/route`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating route:", error.message);
    return error.response.data;
  }
};

export const getRoutes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transport/route`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting routes:", error.message);
    return error.response.data;
  }
};

export const addStop = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transport/stop`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stop:", error.message);
    return error.response.data;
  }
};

export const assignStudentTransport = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transport/assign`, data,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error assigning student transport:", error.message);
    return error.response.data;
  }
};

export const getStudentTransport = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transport/student-transport`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting student transport:", error.message);
    return error.response.data;
  }
};