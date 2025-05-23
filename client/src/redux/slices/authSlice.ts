import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  showAuthModal: boolean;
  authModalView: 'login' | 'signup';
  isAuthenticated: boolean;
  user: null | {
    id?: string;
    name: string;
    email: string;
    token: string;
    cart: object;
  };
}

const initialState: AuthState = {
  showAuthModal: false,
  authModalView: 'login',
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleAuthModal: (state, action: PayloadAction<boolean>) => {
      state.showAuthModal =
        action.payload !== undefined ? action.payload : !state.showAuthModal;
    },
    setAuthModalView: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.authModalView = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {
  toggleAuthModal,
  setAuthModalView,
  setAuthenticated,
  setUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
