// hooks/useCart.ts
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { foodList } = useSelector((state: RootState) => state.food);

  // Memoized cart calculations
  const cartDetails = useMemo(() => {
    // Filter only products in cart for better performance
    const cartProducts = foodList.filter(
      (item) => cartItems[item._id] && cartItems[item._id] > 0
    );

    // Calculate cart totals
    const subtotal = cartProducts.reduce((sum, item) => {
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
    };
  }, [foodList, cartItems]);

  return cartDetails;
};
