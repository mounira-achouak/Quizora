import { createContext, useContext, useState, useEffect } from "react";
import { useQuizData } from "./QuizDataContext";

const QuizContext = createContext();

export function QuizProvider({ category, children }) {
  const { questions } = useQuizData();
  const quizQuestions = questions[category] || [];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [time, setTime] = useState(10);

  const progress = ((current + 1) / quizQuestions.length) * 100;

  // Timer
  useEffect(() => {
    if (finished) return;
    if (time === 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, finished]);

  const handleAnswer = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === quizQuestions[current].answer) {
      setScore((s) => s + 1);
    }
    setTimeout(handleNext, 600);
  };

  const handleNext = () => {
    setSelected(null);
    setTime(10);
    if (current + 1 < quizQuestions.length) {
      setCurrent((c) => c + 1);
    } else {
      setFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((c) => c - 1);
      setSelected(null);
      setTime(10);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        category,
        quizQuestions,
        current,
        score,
        totalQuestions: quizQuestions.length,
        finished,
        selected,
        time,
        progress,
        handleAnswer,
        handleNext,
        handlePrev,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => useContext(QuizContext);