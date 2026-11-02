import { useQuiz } from "../../context/QuizContext";
import { motion } from "framer-motion";

export default function ProgressBar() {
  const { progress } = useQuiz();

  return (
    <div className="relative w-full mb-8">

      {/* TOP INFO */}
      <div className="flex justify-between items-center mb-3">

        <span
          className="
            text-sm
            font-bold
            tracking-[3px]
            text-gray-400
          "
        >
          PROGRESS
        </span>

        <motion.span
          key={progress}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            text-sm
            font-black
            text-yellow-600
          "
        >
          {progress}%
        </motion.span>

      </div>

      {/* BAR */}
      <div
        className="
          relative
          h-5
          rounded-full
          overflow-hidden
          bg-white/50
          border border-white/50
          backdrop-blur-2xl
          shadow-inner
        "
      >

        {/* BACK LIGHT */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-yellow-100/30
            to-orange-100/30
          "
        />

        {/* PROGRESS */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            relative
            h-full
            rounded-full
            bg-gradient-to-r
            from-yellow-400
            via-amber-500
            to-orange-500
            shadow-[0_5px_25px_rgba(255,180,0,0.45)]
          "
        >

          {/* SHINE */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-transparent
              via-white/40
              to-transparent
              animate-pulse
            "
          />

        </motion.div>

      </div>
    </div>
  );
}