import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  selectedCategory: '',
  selectedDifficulty: '',
  selectedType: '',
  numberOfQuestions: '',
  score: 0,
  isQuestionsLoading: false,
  questions: null,
  isError: false,
};

export const getQuiz = createAsyncThunk('getQuiz', async (_, thunkAPI) => {
  const {rejectWithValue, getState} = thunkAPI;
  const {quizConfig} = getState();
  try {
    const {data} = await axios.get(
      `https://opentdb.com/api.php?amount=${quizConfig.numberOfQuestions}&category=${quizConfig.selectedCategory}&difficulty=${quizConfig.selectedDifficulty}&type=${quizConfig.selectedType}`,
    );
    // console.log(
    //   `https://opentdb.com/api.php?amount=${quizConfig.numberOfQuestions}&category=${quizConfig.selectedCategory}&difficulty=${quizConfig.selectedDifficulty}&type=${quizConfig.selectedType}`,
    // );
    return data.results;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeDifficulty: (state, action) => {
      state.selectedDifficulty = action.payload;
    },
    changeType: (state, action) => {
      state.selectedType = action.payload;
    },
    changeNumberOfQuestions: (state, action) => {
      state.numberOfQuestions = action.payload;
    },
    incrementScore: (state, action) => {
      state.score += 1;
    },
    resetPrevScore: (state, action) => {
      state.score = 0;
    },
  },
  extraReducers: builder => {
    builder.addCase(getQuiz.pending, (state, action) => {
      state.isQuestionsLoading = true;
    });
    builder.addCase(getQuiz.fulfilled, (state, {payload}) => {
      state.isQuestionsLoading = false;
      state.questions = payload;
    });
    builder.addCase(getQuiz.rejected, (state, {payload}) => {
      state.isQuestionsLoading = false;
      state.isError = true;
    });
  },
});

export default quizSlice.reducer;

export const {
  changeCategory,
  changeDifficulty,
  changeNumberOfQuestions,
  changeType,
  incrementScore,
  resetPrevScore,
} = quizSlice.actions;
