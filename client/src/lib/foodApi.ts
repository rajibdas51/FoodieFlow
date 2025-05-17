import api from './api';

export const foodApi = {
  getAll: () => api.get('/api/food/list'),
  getById: (id: string) => api.get(`/api/food/${id}`),
};

export default foodApi;
