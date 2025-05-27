import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCart,
  clearCart as clearLocalCart,
} from '@/redux/slices/cartSlice';
import type { AppDispatch } from '@/redux/store';
import { cartApi } from '@/lib/api';
import { AxiosError } from 'axios';
export const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const doSync = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const raw = localStorage.getItem('cartState');
      const guest = raw ? JSON.parse(raw).cartItems : {};

      //  Push to server if any
      if (Object.keys(guest).length) {
        try {
          await cartApi.syncCart(guest);
        } catch (err) {
          console.error('Cart sync failed:', err);

          if (err instanceof AxiosError && err.response?.status === 401) {
            localStorage.removeItem('token');
            dispatch(clearLocalCart());
            window.dispatchEvent(new Event('storage')); // Trigger storage event to re-sync
          }
        }
      }

      localStorage.removeItem('cartState');
      dispatch(clearLocalCart());

      //  Fetch merged server cart
      try {
        await dispatch(fetchCart()).unwrap();
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        if (err instanceof AxiosError && err.response?.status === 401) {
          localStorage.removeItem('token');
          dispatch(clearLocalCart());
          window.dispatchEvent(new Event('storage'));
        }
      }
    };

    doSync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') doSync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [dispatch]);
};
