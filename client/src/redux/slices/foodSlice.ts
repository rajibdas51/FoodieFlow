import { FoodList } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

interface FoodState {
  foodList: FoodList[];
}

const initialState: FoodState = {
  foodList: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
});

export default foodSlice.reducer;
