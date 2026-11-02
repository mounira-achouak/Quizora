import { motion } from "framer-motion";
import quizImg from "../assets/think.jfif";

function About() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-[#fafafe] overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-yellow-200/30 blur-[160px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-violet-200/30 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 leading-tight">
            About <span className="text-yellow-600">QUIZORA</span>
          </h2>

          <p className="mt-6 text-gray-500 text-base md:text-lg leading-relaxed">
            A modern learning platform designed to make knowledge interactive,
            fast, and addictive. Improve your skills through smart quizzes and
            real-time feedback.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {["Fast Learning", "Smart Questions", "Score System"].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-white/60 backdrop-blur-2xl border border-white/40 rounded-2xl p-5 text-center shadow-lg transition"
              >
                <p className="text-sm font-semibold text-gray-700">{t}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative w-[280px] md:w-[340px] h-[380px] md:h-[450px]">
            <motion.img
              src={quizImg}
              className="absolute top-6 left-6 w-full h-full object-cover rounded-[30px] opacity-80 shadow-2xl rotate-[4deg]"
              whileHover={{ rotate: 0, scale: 1.03 }}
            />
            <motion.img
              src={quizImg}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-[30px] shadow-2xl rotate-[-5deg]"
              whileHover={{ rotate: 0, scale: 1.05 }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;