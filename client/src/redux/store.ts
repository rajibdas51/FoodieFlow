import { configureStore } from '@reduxjs/toolkit';
import foodSlice from './slices/foodSlice';
import loaderSlice from './slices/loaderSlice';
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    food: foodSlice,
    loader: loaderSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
