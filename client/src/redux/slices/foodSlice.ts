import { createSlice } from '@reduxjs/toolkit';
import { food_list } from '@/assets/frontend_assets/assets';

interface FoodState {
  foodList: typeof food_list;
}

const initialState: FoodState = {
  foodList: food_list,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
});

export default foodSlice.reducer;
