import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../slice/QuizSlice";

const store = configureStore({
  reducer: {
    quizzes: quizReducer,
  },
});

export default store;
