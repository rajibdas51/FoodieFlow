import { FoodList } from '@/types/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for fetching food list
export const fetchFoodList = createAsyncThunk(
  'food/fetchFoodList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food/list`
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            'Failed to fetch food list'
        );
      }
      return rejectWithValue('Failed to fetch food list');
    }
  }
);

interface FoodState {
  foodList: FoodList[];
  loading: boolean;
  error: string | null;
}

const initialState: FoodState = {
  foodList: [],
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFoodList.fulfilled,
        (state, action: PayloadAction<FoodList[]>) => {
          state.loading = false;
          state.foodList = action.payload;
        }
      )
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default foodSlice.reducer;
