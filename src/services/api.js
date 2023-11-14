import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dhages.methoduscursosonline.com.br',
  // baseURL: 'http://localhost:3333',
});

export default api;
