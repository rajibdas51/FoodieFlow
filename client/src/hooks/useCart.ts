import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useCart = () => {
  // Get state from Redux
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const foodList = useSelector((state: RootState) => state.food.foodList);

  // Calculate cart products
  const cartProducts = useMemo(() => {
    if (!foodList || !cartItems) return [];

    return foodList
      .filter((item) => cartItems[item._id])
      .map((item) => ({
        ...item,
      }));
  }, [foodList, cartItems]);

  // Calculate cart totals
  const subtotal = useMemo(() => {
    if (!cartProducts || !cartItems) return 0;

    return cartProducts.reduce(
      (total, item) => total + item.price * (cartItems[item._id] || 0),
      0
    );
  }, [cartProducts, cartItems]);

  const deliveryFee = 5.99;

  const total = subtotal + deliveryFee;

  const isEmpty = cartProducts.length === 0;

  return {
    cartProducts,
    subtotal,
    deliveryFee,
    total,
    isEmpty,
  };
};
