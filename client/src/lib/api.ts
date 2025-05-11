import axios from 'axios';

// Determine the base URL with fallback
const baseURL =
  typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com'
    : process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com';

// Create axios instance with default configs
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token (if needed)
api.interceptors.request.use(
  (config) => {
    // If you have auth token, you can add it here
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Export API methods
export const foodApi = {
  getAll: () => api.get('/api/food/list'),
  getById: (id: string) => api.get(`/api/food/${id}`),
  // Add more methods as needed
};

export default api;
