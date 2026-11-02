import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import reactImg from "../assets/react2.png";
import htmlImg from "../assets/HTML.jfif";
import jsImg from "../assets/js.jfif";
import cssImg from "../assets/css.jfif";

function Hero() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  const categories = [
    { name: "React", value: "react", img: reactImg },
    { name: "HTML", value: "html", img: htmlImg },
    { name: "JavaScript", value: "js", img: jsImg },
    { name: "CSS", value: "css", img: cssImg },
  ];

  return (
    <div className="relative overflow-hidden bg-[#fafafe]">

      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />

      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-yellow-200/40 blur-[160px] rounded-full -top-40 -left-40"
      />

      <motion.div
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 16, repeat: Infinity }}
        className="absolute w-[500px] h-[500px] bg-violet-200/40 blur-[160px] rounded-full bottom-[-200px] right-[-200px]"
      />

      <section className="text-center pt-28 pb-20 px-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black tracking-tight text-gray-800"
        >
          Test Your{" "}
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Knowledge
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-500 max-w-xl mx-auto text-base md:text-lg"
        >
          Learn, challenge yourself, and improve your skills with interactive quizzes.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/quiz/react")}
          className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-gray-900 to-black text-white font-semibold shadow-xl hover:shadow-2xl transition"
        >
          Start Now
        </motion.button>
      </section>

      {/* CATEGORIES SECTION with id */}
      <section id="categories" className="pb-28 px-6 md:px-12 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800">Choose Category</h2>
          <p className="text-gray-500 mt-2">Select a topic and begin your quiz</p>
        </div>

        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-xl p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-xl p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRight />
        </button>

        <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-2">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/quiz/${c.value}`)}
              className="min-w-[240px] md:min-w-[280px] h-[320px] md:h-[380px] rounded-[30px] overflow-hidden relative cursor-pointer shadow-lg hover:shadow-2xl transition"
            >
              <img src={c.img} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl md:text-3xl font-black">{c.name}</h3>
                <p className="text-sm opacity-80">Start Quiz →</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Hero;