import React from "react";
import { Route, Routes } from "react-router-dom";
import QuizCreationPage from "./pages/QuizCreationPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";

import { useSelector } from "react-redux";

const App = () => {
  const { quizzes } = useSelector((state) => state.quizzes);
  console.log(quizzes);
  return (
    <Routes>
      <Route path="/" element={<QuizCreationPage />} />
      <Route path="/create-quiz" element={<QuizCreationPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
};

export default App;
