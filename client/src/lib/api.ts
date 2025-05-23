import axios from 'axios';

const baseURL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com'
    : process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.token = token;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
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
