import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadState = (key, defaultValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const initialState = {
  quizzes: loadState("quizzes", []),
  currentQuiz: loadState("currentQuiz", null),
  results: loadState("results", null),
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes.push(action.payload);
      localStorage.setItem("quizzes", JSON.stringify(state.quizzes)); // Store quizzes
    },
    setCurrentQuiz: (state, action) => {
      state.currentQuiz = action.payload;
      localStorage.setItem("currentQuiz", JSON.stringify(state.currentQuiz)); // Store currentQuiz
    },
    setResults: (state, action) => {
      state.results = action.payload;
      localStorage.setItem("results", JSON.stringify(state.results)); // Store results
    },
  },
});

export const { addQuiz, setCurrentQuiz, setResults } = quizSlice.actions;
export default quizSlice.reducer;
