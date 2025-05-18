import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from '@/redux/slices/cartSlice';
import type { AppDispatch } from '@/redux/store';

// hook to handle cart synchronization with api
export const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const syncCart = () => {
      const token = localStorage.getItem('token');
      if (token) {
        dispatch(fetchCart());
      }
    };

    // sync cart on initial mount
    syncCart();
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'token' && event.newValue) {
        syncCart();
      }
    };

    // add vent listener for login/logout
    window.addEventListener('storage', handleStorageChange);

    // cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
};
