import { configureStore } from '@reduxjs/toolkit';
import foodSlice from './slices/foodSlice';
import loaderSlice from './slices/loaderSlice';
import cartSlice from './slices/cartSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    food: foodSlice,
    loader: loaderSlice,
    cart: cartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
