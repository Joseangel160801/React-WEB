
// src/services/api.js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const obtenerProductos = async () => {
    const res = await api.get('/productos');
    return res.data;
};

export const crearProducto = async (data) => {
    const res = await api.post('/productos', data);
    return res.data;
};

export const actualizarProducto = async (id, data) => {
    const res = await api.put(`/productos/${id}`, data);
    return res.data;
};

export const eliminarProducto = async (id) => {
    await api.delete(`/productos/${id}`);
};