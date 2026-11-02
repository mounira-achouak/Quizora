import { createContext, useContext, useState } from "react";
import { initialQuestions } from "../data/initialQuestions";

const QuizDataContext = createContext();

export function QuizDataProvider({ children }) {
  const [questions, setQuestions] = useState(initialQuestions);

  const addQuizQuestion = (category, question) => {
    setQuestions((prev) => ({
      ...prev,
      [category]: [...prev[category], question],
    }));
  };

  const deleteQuizQuestion = (category, index) => {
    setQuestions((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  return (
    <QuizDataContext.Provider value={{ questions, addQuizQuestion, deleteQuizQuestion }}>
      {children}
    </QuizDataContext.Provider>
  );
}

export const useQuizData = () => useContext(QuizDataContext);