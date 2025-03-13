import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addQuiz, setCurrentQuiz } from "../redux/slice/QuizSlice";
import { useNavigate } from "react-router-dom";

const QuizCreationPage = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [timeLimit, setTimeLimit] = useState(60);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleAddQuestion = () => {
    if (!newQuestion || !correctAnswer || options.some((opt) => !opt)) return;
    const questionObj = {
      question: newQuestion,
      options,
      correctAnswer,
    };
    setQuestions([...questions, questionObj]);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleCreateQuiz = () => {
    if (!title || questions.length === 0) return;
    const quiz = { title, questions, timeLimit };

    dispatch(addQuiz(quiz));
    dispatch(setCurrentQuiz(quiz));

    navigate("/quiz");
  };

  return (
    <div className="flex w-[100%] items-center justify-center ">
      <div className="flex flex-col w-[50%] p-6">
        <h2 className="text-xl font-bold mb-4">Create a New Quiz</h2>
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 border mb-4"
        />
        <input
          type="number"
          placeholder="Time Limit (seconds)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          className="block w-full p-2 border mb-4"
        />
        <h3 className="font-semibold">Add Question</h3>
        <input
          type="text"
          placeholder="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="block w-full p-2 border mb-2"
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => {
              const newOptions = [...options];
              newOptions[index] = e.target.value;
              setOptions(newOptions);
            }}
            className="block w-full p-2 border mb-2"
          />
        ))}
        <input
          type="text"
          placeholder="Correct Answer"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="block w-full p-2 border mb-4"
        />
        <button
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white p-2 rounded mr-2"
        >
          Add Question
        </button>
        <button
          onClick={handleCreateQuiz}
          className="bg-green-500 text-white p-2 rounded mt-5"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCreationPage;
