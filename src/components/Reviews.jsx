import { motion } from "framer-motion";
import amandaImg from "../assets/amanda.jfif";
import saraheImg from "../assets/sarah.jfif";
import makeImg from "../assets/make.jfif";

function Reviews() {
  const reviews = [
    { name: "Sarah", text: "Amazing app! I improved my skills a lot", img: saraheImg },
    { name: "Mike", text: "The design is beautiful and smooth", img: makeImg },
    { name: "Amanda", text: "Best quiz experience ever", img: amandaImg },
  ];

  return (
    <section id="reviews" className="relative py-24 md:py-32 px-6 bg-[#fafafe] overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-yellow-200/30 blur-[160px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-violet-200/30 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-14 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-black text-gray-800">
          Voices of <span className="text-yellow-600">Success</span>
        </h2>
        <p className="text-gray-500 mt-3">Real feedback from real learners</p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3 relative z-10">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative bg-white/60 backdrop-blur-2xl border border-white/40 rounded-[28px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full" />

            <div className="flex items-center gap-4 mb-5">
              <img src={r.img} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
              <div>
                <h4 className="font-bold text-gray-800">{r.name}</h4>
                <p className="text-xs text-gray-400">Verified learner</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">“{r.text}”</p>
            <div className="mt-6 w-12 h-[2px] bg-yellow-500/50 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;