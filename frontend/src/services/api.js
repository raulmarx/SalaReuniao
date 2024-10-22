import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  
    return req;
  });
  

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const logout = (data, config) => API.post('/logout', data, config);

export const getRooms = () => API.get('/rooms');
export const createRoom = (data) => API.post('/rooms', data);
export const updateRoom = (id, data) => API.put(`/rooms/${id}`, data);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

export const getReserves = () => API.get('/reserves');
export const createReserve = (data) => API.post('/reserves', data);
export const updateReserve = (id, data) => API.put(`/reserves/${id}`, data);
export const deleteReserve = (id) => API.delete(`/reserves/${id}`);
