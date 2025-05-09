import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartItems: { [key: string]: number };
}

const loadCartState = (): CartState => {
  if (typeof window === 'undefined') return { cartItems: {} };
  try {
    const serializedState = localStorage.getItem('cartState');
    if (serializedState === null) {
      return { cartItems: {} };
    }
    return JSON.parse(serializedState);
  } catch {
    return { cartItems: {} };
  }
};

const initialState: CartState = loadCartState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartState', JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else {
        state.cartItems[itemId] -= 1;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartState', JSON.stringify(state));
      }
    },
    // Add new function to set exact quantity
    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        delete state.cartItems[id];
      } else {
        state.cartItems[id] = quantity;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartState', JSON.stringify(state));
      }
    },
    // Add function to clear the entire cart
    clearCart: (state) => {
      state.cartItems = {};
      if (typeof window !== 'undefined') {
        localStorage.setItem('cartState', JSON.stringify(state));
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
