import axios from 'axios';

//  base URL
const baseURL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com'
    : process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com';

// Create axios instance with default configs
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    // Only access localStorage in browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Food API methods
export const foodApi = {
  getAll: () => api.get('/api/food/list'),
  getById: (id: string) => api.get(`/api/food/${id}`),
};

// Cart API methods
export const cartApi = {
  getCart: () => api.get('/api/cart/get'),
  addToCart: (itemId: string) => api.post('/api/cart/add', { itemId }),
  removeFromCart: (itemId: string) =>
    api.delete('/api/cart/remove', { data: { itemId } }),
};

// User API methods
export const userApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/api/users/login', credentials),
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/api/users/register', userData),
  getProfile: () => api.get('/api/users/profile'),
};

export default api;
