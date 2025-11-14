import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// ========== JUEGOS ==========
export const obtenerJuegos = async () => {
  const response = await axios.get(`${API_URL}/juegos`);
  return response.data;
};

export const obtenerJuegoPorId = async (id) => {
  const response = await axios.get(`${API_URL}/juegos/${id}`);
  return response.data;
};

export const crearJuego = async (juego) => {
  const response = await axios.post(`${API_URL}/juegos`, juego);
  return response.data;
};

export const actualizarJuego = async (id, juego) => {
  const response = await axios.put(`${API_URL}/juegos/${id}`, juego);
  return response.data;
};

export const eliminarJuego = async (id) => {
  const response = await axios.delete(`${API_URL}/juegos/${id}`);
  return response.data;
};

// ========== RESEÑAS ==========
export const obtenerResenas = async () => {
  const response = await axios.get(`${API_URL}/resenas`);
  return response.data;
};

export const obtenerResenasPorJuego = async (juegoId) => {
  const response = await axios.get(`${API_URL}/resenas/juego/${juegoId}`);
  return response.data;
};

export const crearResena = async (resena) => {
  const response = await axios.post(`${API_URL}/resenas`, resena);
  return response.data;
};

export const actualizarResena = async (id, resena) => {
  const response = await axios.put(`${API_URL}/resenas/${id}`, resena);
  return response.data;
};

export const eliminarResena = async (id) => {
  const response = await axios.delete(`${API_URL}/resenas/${id}`);
  return response.data;
};