import { useParams } from "react-router-dom";
import { QuizProvider } from "../context/QuizContext";
import { useQuiz } from "../context/QuizContext";
import QuestionCard from "../components/Quiz/QuestionCard";
import Timer from "../components/Quiz/Timer";
import ProgressBar from "../components/Quiz/ProgressBar";
import QuizResult from "../components/Quiz/QuizResult";

export default function QuizPage() {
  const { category } = useParams();

  return (
    <QuizProvider category={category}>
      <QuizContent />
    </QuizProvider>
  );
}

function QuizContent() {
  const { quizQuestions, finished, category } = useQuiz();

  if (!quizQuestions.length) {
    return <div className="p-10 text-center">❌ No quiz found for "{category}"</div>;
  }

  if (finished) {
    return <QuizResult />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fafafa] to-white px-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-700">{category.toUpperCase()}</h2>
          <Timer />
        </div>
        <ProgressBar />
        <QuestionCard />
      </div>
    </div>
  );
}