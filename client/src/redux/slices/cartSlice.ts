import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import cartApi from '@/lib/cartApi';

// Types
interface CartState {
  cartItems: Record<string, number>;
  loading: boolean;
  error: string | null;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

// Persistence helper
const getLocalCart = (): Record<string, number> => {
  if (typeof window === 'undefined') return {};
  try {
    const saved = localStorage.getItem('cartState');
    return saved ? JSON.parse(saved).cartItems : {};
  } catch {
    return {};
  }
};

const saveLocalCart = (cartItems: Record<string, number>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cartState', JSON.stringify({ cartItems }));
  }
};

// Initial state
const initialState: CartState = {
  cartItems: getLocalCart(),
  loading: false,
  error: null,
};

// Async thunks
export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await cartApi.getCart(userId);
      return data.cartData;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to fetch cart'
      );
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (
    { userId, itemId }: { userId: string; itemId: string },
    { rejectWithValue }
  ) => {
    try {
      await cartApi.addToCart(userId, itemId);
      return { itemId };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to add item'
      );
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (
    { userId, itemId }: { userId: string; itemId: string },
    { rejectWithValue }
  ) => {
    try {
      await cartApi.removeFromCart(userId, itemId);
      return { itemId };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return rejectWithValue(
        apiError.response?.data?.message ||
          apiError.message ||
          'Failed to remove item'
      );
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
      saveLocalCart(state.cartItems);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
      }
      saveLocalCart(state.cartItems);
    },
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
      saveLocalCart(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = {};
      saveLocalCart(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    // Fetch cart data
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        saveLocalCart(state.cartItems);
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add item
    builder
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.loading = false;
        state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
        saveLocalCart(state.cartItems);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Remove item
    builder
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        const { itemId } = action.payload;
        state.loading = false;
        if (state.cartItems[itemId] === 1) {
          delete state.cartItems[itemId];
        } else if (state.cartItems[itemId]) {
          state.cartItems[itemId] -= 1;
        }
        saveLocalCart(state.cartItems);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
