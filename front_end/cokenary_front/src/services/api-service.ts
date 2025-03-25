/**
 * Este arquivo gerencia as requisições para a API do Spring Boot
 */

import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/receitas', // Base URL da API
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptors para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na requisição API:', error);
    return Promise.reject(error);
  }
);

// Função genérica para requisições CRUD
const createService = (endpoint: string) => ({
  getAll: async () => {
    return api.get(`/${endpoint}`);
  },
  getById: async (id: string) => {
    return api.get(`/${endpoint}/${id}`);
  },
  create: async (data: any) => {
    return api.post(`/${endpoint}`, data);
  },
  update: async (id: string, data: any) => {
    return api.put(`/${endpoint}/${id}`, data);
  },
  delete: async (id: string) => {
    return api.delete(`/${endpoint}/${id}`);
  },
});

// Serviços para Receitas
export const recipeService = createService('receitas');

// Serviços para Funcionários
export const employeeService = createService('employees');

// Serviços para Restaurantes
export const restaurantService = createService('restaurants');

export default api;