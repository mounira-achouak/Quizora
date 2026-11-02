import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el2 = document.getElementById(id);
        if (el2) el2.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer className="relative bg-white py-20 px-6 overflow-hidden border-t border-gray-100">

      <div className="absolute w-[500px] h-[500px] bg-yellow-200/30 blur-[160px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-blue-200/20 blur-[160px] rounded-full bottom-[-200px] right-[-200px]" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">

        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-800">
            QUIZ<span className="text-yellow-600">ORA</span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm leading-relaxed">
            Learn smarter, improve faster, and enjoy modern interactive quizzes.
          </p>
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold mb-5">Navigation</h3>
          <ul className="space-y-3 text-gray-500">
            <li onClick={() => navigate("/")} className="hover:text-yellow-600 transition cursor-pointer">Home</li>
            <li onClick={() => navigate("/about")} className="hover:text-yellow-600 transition cursor-pointer">About</li>
            <li onClick={() => scrollToSection("categories")} className="hover:text-yellow-600 transition cursor-pointer">Categories</li>
          </ul>
        </div>

        <div>
          <h3 className="text-gray-800 font-semibold mb-5">Categories</h3>
          <ul className="space-y-3 text-gray-500">
            {["react", "html", "js", "css"].map((c) => (
              <li key={c} onClick={() => navigate(`/quiz/${c}`)} className="hover:text-yellow-600 transition cursor-pointer">
                {c.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT SECTION with id */}
        <div id="contact">
          <h3 className="text-gray-800 font-semibold mb-5">Contact</h3>
          <p className="text-gray-500 text-sm">contact@quizora.com</p>

          <div className="flex gap-3 mt-5">
            {["X", "IG", "DC", "GH"].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.08 }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-sm font-semibold cursor-pointer hover:bg-yellow-100 hover:text-yellow-700 transition"
              >
                {s}
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2026 QUIZORA — All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;