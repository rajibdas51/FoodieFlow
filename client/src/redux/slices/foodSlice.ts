import { FoodList } from '@/types/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { foodApi } from '@/lib/api';
import axios from 'axios';

// Define error type for better typing
interface ErrorResponse {
  message: string;
}

// Define async thunk for fetching food list
export const fetchFoodList = createAsyncThunk<
  FoodList, // Return type of the payload creator
  void, // First argument to the payload creator
  {
    // ThunkAPI definition
    rejectValue: string; // Defined for rejectWithValue
  }
>('food/fetchFoodList', async (_, { rejectWithValue }) => {
  try {
    const response = await foodApi.getAll();

    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors with proper typing
      return rejectWithValue(
        (error.response?.data as ErrorResponse)?.message ||
          error.message ||
          'Failed to fetch food list'
      );
    }
    return rejectWithValue(
      'An unexpected error occurred while fetching food list'
    );
  }
});

interface FoodState {
  foodList: FoodList;
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoodList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFoodList.fulfilled,
        (state, action: PayloadAction<FoodList>) => {
          state.loading = false;
          state.foodList = action.payload;
        }
      )
      .addCase(fetchFoodList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearError } = foodSlice.actions;
export default foodSlice.reducer;
