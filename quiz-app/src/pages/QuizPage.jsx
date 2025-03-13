import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResults, setCurrentQuiz } from "../redux/slice/QuizSlice";
import { useNavigate } from "react-router-dom";
import Question from "../components/Question";

const QuizPage = () => {
  const quizzes = useSelector((state) => state.quizzes.quizzes);
  console.log(quizzes); // Get all quizzes
  const currentQuiz = useSelector((state) => state.quizzes.currentQuiz); // Get selected quiz
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleSubmitQuiz();
    }
  }, [timeLeft]);

  // Handle Answer Selection
  const handleSelectAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };
  console.log(answers);

  // Handle Quiz Submission
  const handleSubmitQuiz = () => {
    if (!currentQuiz) return;

    const correctCount = currentQuiz.questions.reduce((count, q, index) => {
      return count + (answers[index] === q.correctAnswer ? 1 : 0);
    }, 0);

    const resultsData = {
      score: correctCount,
      total: currentQuiz.questions.length,
    };
    localStorage.setItem("answers", answers);
    dispatch(setResults(resultsData));
    navigate("/results");
  };

  // Load quizzes from localStorage if needed
  useEffect(() => {
    if (!quizzes.length) {
      const savedQuizzes = JSON.parse(localStorage.getItem("quizzes"));
      if (savedQuizzes) {
        dispatch(setCurrentQuiz(savedQuizzes));
      }
    }
  }, [quizzes, dispatch]);

  // Handle Quiz Selection
  const handleQuizSelection = (index) => {
    dispatch(setCurrentQuiz(quizzes[index]));
    setSelectedQuizIndex(index);
  };

  // If no quizzes are available
  if (!quizzes.length) return <div className="p-6">No quizzes available.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select a Quiz</h2>

      {/* Display Quiz Selection */}
      {!currentQuiz ? (
        <div>
          {quizzes.map((quiz, index) => (
            <button
              key={index}
              onClick={() => handleQuizSelection(index)}
              className="block bg-blue-500 text-white p-2 rounded my-2"
            >
              {quiz.title}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">{currentQuiz.title}</h2>
          <p className="text-red-500">Time Left: {timeLeft}s</p>

          {currentQuiz.questions.map((q, index) => (
            <Question
              key={index}
              question={q}
              index={index}
              answers={answers}
              handleSelectAnswer={handleSelectAnswer}
            />
          ))}

          <button
            onClick={handleSubmitQuiz}
            className="bg-green-500 text-white p-2 rounded mt-4"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
