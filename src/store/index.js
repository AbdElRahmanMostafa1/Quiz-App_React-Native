import {configureStore} from '@reduxjs/toolkit';
import questionsCategoryReducer from './questionsCategorySlice';
import quizReducer from './quizSlice';

const store = configureStore({
  reducer: {
    questionsCategory: questionsCategoryReducer,
    quizConfig: quizReducer,
  },
});

export default store;
