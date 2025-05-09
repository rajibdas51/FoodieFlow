// hooks/useCart.ts
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FoodItem } from '@/types/types';

export const useCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { foodList, loading } = useSelector((state: RootState) => state.food);

  // Memoized cart calculations
  const cartDetails = useMemo(() => {
    // Ensure foodList is an array before using filter
    const safeList = Array.isArray(foodList) ? foodList : [];

    // Filter only products in cart for better performance
    const cartProducts = safeList.filter(
      (item: FoodItem) => cartItems[item._id] && cartItems[item._id] > 0
    );

    // Calculate cart totals
    const subtotal = cartProducts.reduce((sum, item: FoodItem) => {
      const quantity = cartItems[item._id] || 0;
      return sum + item.price * quantity;
    }, 0);

    const itemCount = Object.values(cartItems).reduce(
      (sum, quantity) => sum + quantity,
      0
    );

    // Set delivery fee to 0 if cart is empty
    const deliveryFee = itemCount === 0 ? 0 : 2;

    const total = subtotal + deliveryFee;

    return {
      cartProducts,
      subtotal,
      total,
      itemCount,
      deliveryFee,
      isEmpty: itemCount === 0,
      isLoading: loading,
    };
  }, [foodList, cartItems, loading]);

  return cartDetails;
};
