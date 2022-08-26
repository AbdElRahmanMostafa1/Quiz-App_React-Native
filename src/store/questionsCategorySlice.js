import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  allCategories: [],
  isLoading: false,
  isError: false,
};

export const getQuestionsCategory = createAsyncThunk(
  'questionCategory/getQuestionsCategory',
  async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
      const {data} = await axios.get(`https://opentdb.com/api_category.php`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const questionCategorySlice = createSlice({
  name: 'questionCategory',
  initialState,
  extraReducers: builder => {
    builder.addCase(getQuestionsCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getQuestionsCategory.fulfilled, (state, {payload}) => {
      state.isLoading = false;
      state.allCategories = payload;
    });
    builder.addCase(getQuestionsCategory.rejected, (state, {payload}) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default questionCategorySlice.reducer;
