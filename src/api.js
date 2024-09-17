import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => axios.get(API_URL);
export const addUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, updatedUser) => axios.put(`${API_URL}/${id}`, updatedUser);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
