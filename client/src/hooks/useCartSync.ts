import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCart,
  clearCart as clearLocalCart,
} from '@/redux/slices/cartSlice';
import type { AppDispatch } from '@/redux/store';
import { cartApi } from '@/lib/api';

export const useCartSync = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const doSync = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      // 1) grab guest cart
      const raw = localStorage.getItem('cartState');
      const guest = raw ? JSON.parse(raw).cartItems : {};

      // 2) push to server if any
      if (Object.keys(guest).length) {
        try {
          await cartApi.syncCart(guest);
        } catch (err) {
          console.error('Cart sync failed', err);
        }
      }

      // 3) clear guest cart
      localStorage.removeItem('cartState');
      dispatch(clearLocalCart());

      // 4) fetch merged server cart
      dispatch(fetchCart());
    };

    doSync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'token') doSync();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [dispatch]);
};
