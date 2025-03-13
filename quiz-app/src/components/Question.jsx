import React from "react";

const Question = ({ question, index, answers, handleSelectAnswer }) => {
  return (
    <div className="mb-4">
      <p className="font-semibold">{question.question}</p>
      {question.options.map((option, i) => (
        <button
          key={i}
          className={`block w-full p-2 border rounded mb-2 ${
            answers[index] === option ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleSelectAnswer(index, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Question;
