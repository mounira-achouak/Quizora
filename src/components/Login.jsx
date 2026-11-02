import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const trimmed = username.trim();

      if (!trimmed) {
        setError("Enter your username");
        setLoading(false);
        return;
      }

      if (trimmed.toLowerCase() === "admin") {
        if (!password) {
          setError("Admin password required");
          setLoading(false);
          return;
        }

        const res = login(username, password);

        if (res.success) navigate("/admin");
        else setError(res.error);
      } else {
        const res = login(username);
        if (res.success) navigate("/");
        else setError(res.error);
      }

      setLoading(false);
    }, 700);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f4f4fb] overflow-hidden px-4">

      {/* animated background */}
      <div className="absolute w-[600px] h-[600px] bg-yellow-200/30 blur-[160px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[600px] h-[600px] bg-violet-200/30 blur-[160px] rounded-full bottom-[-250px] right-[-200px]" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="
          w-full
          sm:w-[90%]
          md:w-[420px]

          bg-white/60 backdrop-blur-3xl
          border border-white/40
          shadow-[0_30px_120px_rgba(0,0,0,0.12)]

          rounded-[40px]
          p-6 sm:p-8 md:p-10

          flex flex-col gap-5
        "
      >

        {/* TITLE */}
        <div className="text-center mb-2">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-800">
            Welcome
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue
          </p>
        </div>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-2xl"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="
            w-full
            p-4
            rounded-2xl
            bg-white/70
            border border-white/50
            backdrop-blur-xl

            focus:outline-none
            focus:ring-2
            focus:ring-yellow-400

            text-gray-700
            font-medium
            transition
          "
        />

        {/* PASSWORD */}
        {(username.toLowerCase() === "admin" || showPassword) && (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/70
              border border-white/50
              backdrop-blur-xl

              focus:outline-none
              focus:ring-2
              focus:ring-yellow-400

              text-gray-700
              font-medium
              transition
            "
          />
        )}

        {/* optional password */}
        {username && username.toLowerCase() !== "admin" && !showPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(true)}
            className="text-xs text-gray-400 hover:text-yellow-600 text-left"
          >
            Add password (optional)
          </button>
        )}

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="
            relative
            w-full
            py-4
            rounded-2xl

            font-bold
            text-white
            text-lg

            bg-gradient-to-r
            from-yellow-400
            via-amber-500
            to-yellow-500

            shadow-[0_20px_60px_rgba(255,180,0,0.35)]

            overflow-hidden
          "
        >
          {loading ? "Processing..." : "Login"}

          {/* shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full duration-1000" />
        </motion.button>

        {/* cancel */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="
            w-full
            py-4
            rounded-2xl
            bg-white/50
            border border-white/40
            text-gray-600
            font-semibold
            hover:bg-white/70
            transition
          "
        >
          Cancel
        </button>

        {/* FOOTER INFO */}
        <div className="text-center text-xs text-gray-400 pt-4 border-t border-white/40">
          <p>Admin: admin / admin123</p>
          <p>User: any username</p>
        </div>

      </motion.form>
    </div>
  );
}

export default Login;