import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFeeStructures = async () => {
  const res = await axios.get(`${API_BASE_URL}/fee-structures`,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const getFeeStructureById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/fee-structures/${id}/full`,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const getPaymentsByInstitutionId = async (institutionId) => {
  const res = await axios.get(`${API_BASE_URL}/fee-payments/payments/institution/${institutionId}`,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const createFeeAssignment = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/fee-assignments/assign`, data,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const getFeeAssignments = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/fee-assignments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      student_ids: id, // or [id]
    },
  });

  return res.data;
};

export const getFeeAssignmentById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/fee-assignments/${id}`,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const updateFeeAssignment = async (id, data) => {
  const res = await axios.put(`${API_BASE_URL}/fee-assignments/${id}`, data,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const deleteFeeAssignment = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/fee-assignments/${id}`,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}

export const collectFees = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/fee-assignments/collect`, data,
    {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
  );
  return res.data;
}