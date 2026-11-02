import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const scrollToSection = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setOpen(false);
  };

  const navigateTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  const linkClass = "text-gray-600 hover:text-yellow-600 transition font-medium cursor-pointer";

  return (
    <header className="
      sticky top-0 z-50
      backdrop-blur-2xl
      bg-white/70
      border-b border-white/40
      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
    ">

      <div className="max-w-6xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">

        <h1
          onClick={() => navigateTo("/")}
          className="text-2xl md:text-3xl font-black tracking-tight cursor-pointer text-gray-800"
        >
          QUIZ<span className="text-yellow-600">ORA</span>
        </h1>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => navigateTo("/")} className={linkClass}>Home</button>
          <button onClick={() => scrollToSection("categories")} className={linkClass}>Categories</button>
          <button onClick={() => scrollToSection("reviews")} className={linkClass}>Reviews</button>
          <button onClick={() => navigateTo("/about")} className={linkClass}>About</button>
          <button onClick={() => scrollToSection("contact")} className={linkClass}>Contact</button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <div className="text-gray-700 font-semibold">
                {user.username}
                {user.role === "admin" && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                    Admin
                  </span>
                )}
              </div>
              {user.role === "admin" && (
                <button
                  onClick={() => navigateTo("/admin")}
                  className="px-4 py-2 rounded-full text-sm text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:opacity-90 shadow-md"
                >
                  Dashboard
                </button>
              )}
            </div>
          )}

          {!user ? (
            <button
              onClick={() => navigateTo("/login")}
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-yellow-500 to-amber-500 hover:scale-[1.03] transition shadow-lg"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 hover:scale-[1.03] transition shadow-lg"
            >
              Logout
            </button>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-gray-700 text-2xl">
          ☰
        </button>

      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/40 bg-white/80 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              <button onClick={() => navigateTo("/")} className={linkClass}>Home</button>
              <button onClick={() => scrollToSection("categories")} className={linkClass}>Categories</button>
              <button onClick={() => scrollToSection("reviews")} className={linkClass}>Reviews</button>
              <button onClick={() => navigateTo("/about")} className={linkClass}>About</button>
              <button onClick={() => scrollToSection("contact")} className={linkClass}>Contact</button>
              <div className="pt-4 border-t border-gray-200">
                {!user ? (
                  <button onClick={() => navigateTo("/login")} className="w-full py-3 rounded-full bg-yellow-500 text-white font-semibold">
                    Login
                  </button>
                ) : (
                  <button onClick={handleLogout} className="w-full py-3 rounded-full bg-red-500 text-white font-semibold">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}

export default Navbar;