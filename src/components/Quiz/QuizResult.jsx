import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuiz } from "../../context/QuizContext";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from "react";

export default function QuizResult() {
  const { score, totalQuestions, category } = useQuiz();
  const { user, addQuizResult } = useAuth();
  const navigate = useNavigate();
  const hasSaved = useRef(false);

  useEffect(() => {
    if (!hasSaved.current && user) {
      hasSaved.current = true;
      addQuizResult(user.username, category, score, totalQuestions);
    }
  }, [user, category, score, totalQuestions, addQuizResult]);

  const percent = Math.round((score / totalQuestions) * 100);

  const getBadge = () => {
    if (percent === 100)
      return {
        title: "LEGENDARY",
        color: "from-yellow-400 to-amber-500",
        text: "A flawless performance with exceptional precision.",
      };

    if (percent >= 80)
      return {
        title: "EXCELLENT",
        color: "from-indigo-500 to-violet-600",
        text: "Outstanding work with impressive consistency.",
      };

    if (percent >= 60)
      return {
        title: "GOOD",
        color: "from-emerald-500 to-green-600",
        text: "Strong effort and a solid result overall.",
      };

    if (percent >= 40)
      return {
        title: "FAIR",
        color: "from-orange-400 to-amber-500",
        text: "A decent attempt with room for improvement.",
      };

    return {
      title: "RETRY",
      color: "from-rose-500 to-red-600",
      text: "Keep practicing and come back stronger.",
    };
  };

  const badge = getBadge();

  return (
    <div
      className="
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-[#f8f8ff]
        via-[#fffdf8]
        to-[#f4f0ff]
        overflow-hidden
        px-4
        relative
      "
    >

      {/* BACKGROUND LIGHTS */}
      <div
        className="
          absolute -top-32 -left-32
          w-[420px] h-[420px]
          bg-yellow-200/30
          blur-[140px]
          rounded-full
        "
      />

      <div
        className="
          absolute bottom-[-120px] right-[-120px]
          w-[420px] h-[420px]
          bg-violet-200/30
          blur-[140px]
          rounded-full
        "
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}

        className="
          relative
          w-full max-w-lg
          overflow-hidden
          rounded-[40px]
          border border-white/40
          bg-white/55
          backdrop-blur-3xl
          shadow-[0_30px_100px_rgba(0,0,0,0.12)]
          p-10 md:p-12
        "
      >

        {/* TOP LINE */}
        <div
          className="
            absolute top-0 left-0
            w-full h-1
            bg-gradient-to-r
            from-yellow-300
            via-amber-400
            to-yellow-500
          "
        />

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >

          <h1
            className="
              text-4xl md:text-5xl
              font-black
              tracking-tight
              text-gray-800
              mb-4
            "
          >
            Quiz Completed
          </h1>

          <div
            className={`
              inline-flex items-center justify-center
              px-5 py-2
              rounded-full
              bg-gradient-to-r ${badge.color}
              text-white
              text-sm
              font-bold
              tracking-[3px]
              shadow-lg
            `}
          >
            {badge.title}
          </div>
        </motion.div>

        {/* SCORE CIRCLE */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}

          animate={{
            opacity: 1,
            scale: 1,
          }}

          transition={{
            delay: 0.15,
            duration: 0.4,
          }}

          className="flex justify-center mb-10"
        >

          <div className="relative">

            {/* OUTER GLOW */}
            <div
              className="
                absolute inset-0
                rounded-full
                bg-yellow-300/20
                blur-2xl
                scale-125
              "
            />

            {/* CIRCLE */}
            <div
              className="
                relative
                w-52 h-52
                rounded-full
                border-[10px]
                border-white/50
                bg-white/40
                backdrop-blur-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                flex flex-col items-center justify-center
              "
            >

              <h2
                className="
                  text-6xl
                  font-black
                  bg-gradient-to-r
                  from-yellow-500
                  to-amber-600
                  bg-clip-text
                  text-transparent
                "
              >
                {percent}%
              </h2>

              <div className="w-16 h-[2px] bg-gray-300 my-3 rounded-full" />

              <p className="text-gray-500 font-semibold tracking-wide">
                {score} / {totalQuestions} Correct
              </p>

            </div>
          </div>
        </motion.div>

        {/* MESSAGE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-center mb-12"
        >

          <p
            className="
              text-gray-600
              text-lg
              leading-relaxed
              max-w-md
              mx-auto
            "
          >
            {badge.text}
          </p>

        </motion.div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">

          {/* RETRY */}
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -2,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={() => window.location.reload()}

            className="
              flex-1
              relative overflow-hidden
              rounded-2xl
              px-6 py-4
              font-bold
              text-white
              bg-gradient-to-r
              from-yellow-400
              via-amber-500
              to-yellow-500
              shadow-[0_15px_40px_rgba(255,180,0,0.35)]
            "
          >

            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                -translate-x-full
                hover:translate-x-full
                duration-1000
              "
            />

            <span className="relative z-10">
              Retry Quiz
            </span>

          </motion.button>

          {/* HOME */}
          <motion.button
            whileHover={{
              scale: 1.03,
              y: -2,
            }}

            whileTap={{
              scale: 0.97,
            }}

            onClick={() => navigate("/")}

            className="
              flex-1
              rounded-2xl
              px-6 py-4
              font-bold
              text-gray-700
              border border-gray-200
              bg-white/70
              backdrop-blur-xl
              shadow-lg
              hover:bg-white
              transition-all
            "
          >
            Back Home
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
}