import { useQuiz } from "../../context/QuizContext";
import { motion } from "framer-motion";

export default function Timer() {
  const { time } = useQuiz();

  const danger = time <= 5;

  return (
    <motion.div
      animate={
        danger
          ? {
              scale: [1, 1.08, 1],
            }
          : {}
      }

      transition={{
        duration: 0.8,
        repeat: Infinity,
      }}

      className="relative flex items-center justify-center"
    >

      {/* OUTER GLOW */}
      <div
        className={`
          absolute
          w-20 h-20
          rounded-full
          blur-2xl
          ${
            danger
              ? "bg-red-400/30"
              : "bg-yellow-300/30"
          }
        `}
      />

      {/* ROTATING RING */}
      <motion.div
        animate={{
          rotate: 360,
        }}

        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}

        className={`
          absolute
          w-16 h-16
          rounded-full
          border
          border-dashed
          ${
            danger
              ? "border-red-400/50"
              : "border-yellow-400/50"
          }
        `}
      />

      {/* MAIN TIMER */}
      <div
        className={`
          relative
          w-16 h-16
          rounded-full
          flex items-center justify-center
          backdrop-blur-3xl
          border
          shadow-[0_10px_35px_rgba(0,0,0,0.12)]
          ${
            danger
              ? "bg-red-50 border-red-300"
              : "bg-white/70 border-white/50"
          }
        `}
      >

        <motion.span
          key={time}

          initial={{
            opacity: 0,
            y: 6,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          className={`
            text-2xl
            font-black
            ${
              danger
                ? "text-red-500"
                : "text-yellow-600"
            }
          `}
        >
          {time}
        </motion.span>

      </div>
    </motion.div>
  );
}