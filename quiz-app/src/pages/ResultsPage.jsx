import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  // Fetch results from Redux or fallback to localStorage
  const results =
    useSelector((state) => state.quizzes.results) ||
    JSON.parse(localStorage.getItem("quizResults"));
  console.log(results);
  const currentQuiz =
    useSelector((state) => state.quizzes.currentQuiz) ||
    JSON.parse(localStorage.getItem("currentQuiz"));
  console.log(currentQuiz);
  const navigate = useNavigate();

  // Ensure data exists before rendering
  if (!results || !currentQuiz) {
    return (
      <div className="p-6">No results available. Try taking a quiz first.</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Quiz Results</h2>
      <p>
        Score: {results.score} / {results.total}
      </p>
      <h3 className="font-semibold mt-4">Review Answers:</h3>
      {currentQuiz.questions.map((q, index) => (
        <div key={index} className="mb-2">
          <p>{q.question}</p>
          <p
            className={
              results.answers && results.answers[index] === q.correctAnswer
                ? "text-green-500"
                : "text-red-500"
            }
          >
            Your Answer: {results.answers?.[index] || "Not answered"}
          </p>
          <p className="text-blue-500">Correct Answer: {q.correctAnswer}</p>
        </div>
      ))}
      <button
        onClick={() => navigate("/create-quiz")}
        className="bg-blue-500 text-white p-2 rounded mt-4"
      >
        Create New Quiz
      </button>
    </div>
  );
};

export default ResultsPage;
