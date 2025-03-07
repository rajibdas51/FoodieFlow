import { configureStore } from '@reduxjs/toolkit';
import foodSlice from './slices/foodSlice';
import loaderSlice from './slices/loaderSlice';
const store = configureStore({
  reducer: {
    food: foodSlice,
    loader: loaderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
