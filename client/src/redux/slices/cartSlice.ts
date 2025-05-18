import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';
import { AppDispatch, RootState } from '@/redux/store';
import { getErrorMessage } from '@/lib/utils';
// Types
type CartData = { [key: string]: number };
type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: string;
};

interface CartState {
  cartItems: CartData;
  loading: boolean;
  error: string | null;
}

// load cart from localstorage
const loadCartState = (): { cartItems: { [key: string]: number } } => {
  if (typeof window === 'undefined') return { cartItems: {} };
  try {
    const localCartState = localStorage.getItem('cartState');
    if (localCartState === null) {
      return { cartItems: {} };
    }
    return JSON.parse(localCartState);
  } catch {
    return { cartItems: {} };
  }
};

// Initial state
const initialState: CartState = {
  loading: false,
  error: null,
  ...loadCartState(), // Then spread the loaded state
};

// fetch cart from api
export const fetchCart = createAsyncThunk<CartData, void, ThunkApiConfig>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/cart/get');
      return response.data.cartData || {}; // Ensure we return an object even if API returns null/undefined
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// add single item to cart
export const addItemToCart = createAsyncThunk<string, string, ThunkApiConfig>(
  'cart/addItem',
  async (itemId, { rejectWithValue }) => {
    try {
      await api.post('/api/cart/add', { itemId });
      return itemId;
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// asynk thunk : remove single item from cart
export const removeItemFromCart = createAsyncThunk<
  string,
  string,
  ThunkApiConfig
>('cart/removeItem', async (itemId, { rejectWithValue }) => {
  try {
    await api.delete('/api/cart/remove', { data: { itemId } });
    return itemId;
  } catch (error: unknown) {
    return rejectWithValue(getErrorMessage(error));
  }
});

// the slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // local actions for offline
    addToCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      // Initialize if not present
      state.cartItems = state.cartItems || {};

      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      // Initialize if not present
      state.cartItems = state.cartItems || {};

      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else if (state.cartItems[itemId] > 1) {
        state.cartItems[itemId] -= 1;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      // Initialize if not present
      state.cartItems = state.cartItems || {};

      if (quantity <= 0) {
        delete state.cartItems[id];
      } else {
        state.cartItems[id] = quantity;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    },
    // clear localstorage cart
    clearCart(state) {
      state.cartItems = {};
      state.error = null;

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    },

    syncCartWithAPI: (
      state,
      action: PayloadAction<{ [key: string]: number }>
    ) => {
      state.cartItems = action.payload || {};

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    },
  },
  extraReducers: (builder) => {
    // fetch cart handlers
    builder.addCase(fetchCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload || {};

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // add item handler
    builder.addCase(addItemToCart.fulfilled, (state, action) => {
      const itemId = action.payload;
      // Initialize if not present
      state.cartItems = state.cartItems || {};

      if (!state.cartItems[itemId]) {
        state.cartItems[itemId] = 1;
      } else {
        state.cartItems[itemId] += 1;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    });
    // remove item handlers
    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      const itemId = action.payload;
      // Initialize if not present
      state.cartItems = state.cartItems || {};

      if (state.cartItems[itemId] === 1) {
        delete state.cartItems[itemId];
      } else if (state.cartItems[itemId] > 1) {
        state.cartItems[itemId] -= 1;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'cartState',
          JSON.stringify({ cartItems: state.cartItems })
        );
      }
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  syncCartWithAPI,
} = cartSlice.actions;

export default cartSlice.reducer;
