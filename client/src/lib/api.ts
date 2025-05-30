import axios from 'axios';

//const baseURL = 'https://foodieflow.onrender.com';
const baseURL = 'http://localhost:4000';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the Bearer token to every request
api.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') return config;
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      const cleanToken = token.replace(/^"|"$/g, ''); // Remove surrounding quotes if they exist
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn('Unauthorized – perhaps your session expired.');
    }
    return Promise.reject(err);
  }
);

export const cartApi = {
  getCart: () => api.get('/api/cart/get'),
  addToCart: (itemId: string) => api.post('/api/cart/add', { itemId }),
  removeFromCart: (itemId: string) =>
    api.delete('/api/cart/remove', { data: { itemId } }),
  syncCart: (cartItems: Record<string, number>) =>
    api.post('/api/cart/sync', { cartItems }),
};

export const foodApi = {
  getAll: () => api.get('/api/food/list'),
  getById: (id: string) => api.get(`/api/food/${id}`),
};

export const userApi = {
  login: (cred: { email: string; password: string }) =>
    api.post('/api/users/login', cred),
  register: (user: { name: string; email: string; password: string }) =>
    api.post('/api/users/register', user),
  getProfile: () => api.get('/api/users/profile'),
};

export default api;
