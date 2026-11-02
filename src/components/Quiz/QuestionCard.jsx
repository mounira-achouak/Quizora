import { useQuiz } from "../../context/QuizContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  ChevronRight,
  ChevronLeft,
  Flame,
} from "lucide-react";

export default function QuestionCard() {
  const {
    quizQuestions,
    current,
    selected,
    handleAnswer,
    handleNext,
    handlePrev,
    time,
  } = useQuiz();

  const q = quizQuestions[current];

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 px-3">

      {/* BACKGROUND LIGHTS */}
      <div className="absolute inset-0 overflow-hidden rounded-[50px]">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -top-32 -left-20 w-[300px] h-[300px] bg-yellow-300/30 blur-[120px] rounded-full"
        />

        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-orange-400/20 blur-[120px] rounded-full"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ type: "tween", duration: 0.18 }}
          className="
            relative overflow-hidden
            backdrop-blur-3xl
            bg-white/55
            border border-white/30
            rounded-[35px]
            shadow-[0_25px_80px_rgba(0,0,0,0.15)]
            p-4 md:p-12
            max-h-[90vh]
            overflow-y-auto
          "
        >

          {/* TOP LINE */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500" />

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">

            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-xl shadow-md">
              <span className="text-white font-black text-sm md:text-lg">
                Q {current + 1}/{quizQuestions.length}
              </span>
            </div>

            {/* TIMER */}
            <div className={`
              flex items-center gap-2 px-4 py-2 rounded-xl border
              ${time <= 5 ? "bg-red-100 border-red-300" : "bg-white/70 border-white/40"}
            `}>
              <Clock3 size={20} className={time <= 5 ? "text-red-500" : "text-yellow-500"} />

              <span className={`font-black text-lg ${time <= 5 ? "text-red-500" : "text-gray-700"}`}>
                {time}s
              </span>

              {time <= 5 && <Flame className="text-red-500 animate-bounce" />}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="mb-8">
            <div className="h-3 bg-white/40 rounded-full overflow-hidden border border-white/40">
              <motion.div
                animate={{
                  width: `${((current + 1) / quizQuestions.length) * 100}%`,
                }}
                className="h-full bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500"
              />
            </div>
          </div>

          {/* QUESTION */}
          <h2 className="text-xl md:text-4xl font-black text-gray-800 mb-8">
            {q.question}
          </h2>

          {/* OPTIONS */}
          <div className="grid gap-4">
            {q.options.map((opt, i) => {
              let style = "bg-white/70 border-white/40 text-gray-800";

              if (selected) {
                if (opt === q.answer) {
                  style =
                    "bg-green-500 text-white border-green-300";
                } else if (opt === selected) {
                  style =
                    "bg-red-500 text-white border-red-300";
                }
              }

              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt)}
                  disabled={selected !== null}
                  className={`
                    p-4 rounded-2xl border-2 text-left font-bold
                    transition-all duration-300
                    ${style}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-black/10 rounded-xl font-black">
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-base md:text-xl">
                      {opt}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="flex justify-between mt-8">

            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-xl border"
            >
              <ChevronLeft size={18} />
              Prev
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl"
            >
              Next
              <ChevronRight size={18} />
            </button>

          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}