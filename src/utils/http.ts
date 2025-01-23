import axiosInstance  from './httpClient';

export const getAllUsers = async () => {
  const response = await axiosInstance.get('/user');
  return response?.data;
}

export const createUser = async (data) => {
  const response = await axiosInstance.post('/user', data);
  return response?.data;
}

export const updateUser = async (id, data) => {
  const response = await axiosInstance.patch(`/user/${id}`, data);
  return response?.data;
}

export const deleteUser = async (id) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response?.data;
}

export const generatePdf = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/user/pdf/${id}`);
  return response?.arrayBuffer();
}
