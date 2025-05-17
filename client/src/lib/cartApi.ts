import api from './api';

// Cart API methods
export const cartApi = {
  // Add an item to the cart
  addToCart: (userId: string, itemId: string) =>
    api.post('/api/cart/add', { userId, itemId }),

  // Remove an item from the cart
  removeFromCart: (userId: string, itemId: string) =>
    api.delete('/api/cart/remove', { data: { userId, itemId } }),

  // Get the user's cart
  getCart: (userId: string) => api.get('/api/cart/get', { data: { userId } }),
};

export default cartApi;
